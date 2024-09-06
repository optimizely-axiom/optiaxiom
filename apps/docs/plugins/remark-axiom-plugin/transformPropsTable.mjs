import fg from "fast-glob";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import docgen from "react-docgen-typescript";
import { visit } from "unist-util-visit";

const docs = docgen
  .withCompilerOptions(
    { esModuleInterop: true },
    {
      savePropValueAsString: true,
      shouldExtractValuesFromUnion: true,
    },
  )
  .parse(
    fg.globSync(
      "../../packages/react/src/**/{*.css.ts,sprinkles.css.ts,*.tsx}",
      {
        ignore: ["**/*.spec.*"],
      },
    ),
  );

export function transformPropsTable(tree) {
  let needsImport = true;

  visit(
    tree,
    { name: "ax-props-table", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const componentRaw = node.attributes.find(
        (attr) => attr.name === "component",
      ).value;
      const extendsComponent =
        node.attributes.find((attr) => attr.name === "extends")?.value ?? "Box";
      const component = componentRaw.value ?? componentRaw;
      const doc = docs.find(
        (doc) => doc.displayName === `@optiaxiom/react/${component}`,
      );
      if (!doc) {
        throw new Error(`Could not find component doc: ${component}`);
      }

      const sprinkles = docs.find((doc) => doc.displayName === "sprinkles");
      const styles = docs.filter(
        (d) => d.filePath === doc.filePath.replace(".tsx", ".css.ts"),
      );

      const props = Object.entries(doc.props)
        .sort(([a], [b]) => a.localeCompare(b))
        .filter(([, prop]) =>
          prop.parent
            ? !prop.parent.fileName.includes("@types/react")
            : prop.name === "asChild" ||
              prop.declarations.find(
                (decl) => decl.fileName === doc.filePath,
              ) ||
              styles.find((style) => Object.hasOwn(style.props, prop.name)) ||
              (component === "Box" &&
                Object.hasOwn(sprinkles?.props ?? {}, prop.name)),
        )
        .filter(([, prop]) => prop.type.name !== "never")
        .map(([, prop]) => prop);

      const tree = fromMarkdown(
        [
          needsImport && `import { Box } from "@optiaxiom/react";`,
          needsImport &&
            `import { Table, Td, Th, Tr } from "@/components/table";`,
          needsImport && `import { PropType } from "@/components/prop-type";`,
          "",
          `### \`${component}\``,
          ...(typeof extendsComponent === "string"
            ? [
                "",
                `Supports all [\`${extendsComponent}\`](/components/${kebabCase(extendsComponent)}#props) props` +
                  (props.length > 0 ? " in addition to its own" : "") +
                  ".",
              ]
            : []),
          ...(props.length > 0
            ? [
                "",
                "<Table>",
                "  <thead>",
                "    <tr>",
                '      <Th asChild style={{ width: "25%" }}>',
                "        Name",
                "      </Th>",
                '      <Th asChild style={{ width: "75%" }}>',
                "        Type",
                "      </Th>",
                "    </tr>",
                "  </thead>",
                "  <tbody>",
                ...props.flatMap((prop) => [
                  "<Tr>",
                  '  <Td whiteSpace="nowrap">',
                  `    {<Box color="fg.accent.magenta" fontFamily="mono">${prop.name}${prop.required ? "*" : ""}</Box>}`,
                  "  </Td>",
                  "  <Td>",
                  [
                    `<PropType
                    component="${component}"
                    prop={${JSON.stringify(prop)}}
                    sprinkle={${JSON.stringify(sprinkles?.props[prop.name])}}
                  />`,
                    prop.description
                      .replaceAll(/{@link ([^\s}]+)(?:\s([^}]+))}/g, "[$2]($1)")
                      .replaceAll(/{@link ([^}]+)}/g, "[$1]($1)")
                      .replaceAll(/@example .+/g, "\n\n")
                      .replaceAll("@see", "\n\n"),
                  ]
                    .filter(Boolean)
                    .join("\n\n"),
                  "  </Td>",
                  "</Tr>",
                ]),
                "  </tbody>",
                "</Table>",
              ]
            : []),
        ]
          .filter((line) => line !== false)
          .join("\n"),
        {
          extensions: [mdxjs()],
          mdastExtensions: [mdxFromMarkdown()],
        },
      );
      visit(tree, { type: "mdxJsxFlowElement" }, (node) => {
        node.data = { _mdxExplicitJsx: true };
      });
      parent.children.splice(index, 1, ...tree.children);

      needsImport = false;

      return index + tree.children.length;
    },
  );
}

function kebabCase(str) {
  return str.replaceAll(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
