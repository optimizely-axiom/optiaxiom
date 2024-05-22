import fg from "fast-glob";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import docgen from "react-docgen-typescript";
import { visit } from "unist-util-visit";

export function transformPropsTable(tree) {
  let needsImport = true;

  visit(
    tree,
    { name: "ax-props-table", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
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
            "../../packages/react/src/**/{*.recipe.ts,sprinkles.css.ts,*.tsx}",
            {
              ignore: ["**/*.spec.*"],
            },
          ),
        );

      const componentRaw = node.attributes.find(
        (attr) => attr.name === "component",
      ).value;
      const component = componentRaw.value ?? componentRaw;
      const doc = docs.find(
        (doc) => doc.displayName === `@optiaxiom/react/${component}`,
      );
      if (!doc) {
        throw new Error(`Could not find component doc: ${component}`);
      }

      const sprinkles = docs.find((doc) => doc.displayName === "sprinkles");
      const recipes = docs.find(
        (d) =>
          d.displayName === "recipe" &&
          d.filePath === doc.filePath.replace(".tsx", ".recipe.ts"),
      );

      const tree = fromMarkdown(
        [
          needsImport && `import { Box } from "@optiaxiom/react";`,
          needsImport &&
            `import { Table, Td, Th, Tr } from "@/components/table";`,
          needsImport && `import { PropType } from "@/components/prop-type";`,
          "",
          `### \`${component}\` component props`,
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
          ...Object.entries(doc.props)
            .sort(([a], [b]) => a.localeCompare(b))
            .filter(([, prop]) =>
              prop.parent
                ? !prop.parent.fileName.includes("@types/react")
                : prop.declarations.find(
                    (decl) => decl.fileName === doc.filePath,
                  ) ||
                  Object.hasOwn(recipes?.props ?? {}, prop.name) ||
                  (component === "Box" &&
                    Object.hasOwn(sprinkles?.props ?? {}, prop.name)),
            )
            .flatMap(([, prop]) => [
              "<Tr>",
              '  <Td whiteSpace="nowrap">',
              `    {<Box color="fg.accent.magenta" fontFamily="mono">${prop.name}${prop.required ? "*" : ""}</Box>}`,
              "  </Td>",
              "  <Td>",
              [
                `<PropType component="${component}" prop={${JSON.stringify(prop)}} />`,
                prop.description
                  .replaceAll(/{@link ([^\s}]+)(?:\s([^}]+))}/g, "[$2]($1)")
                  .replaceAll(/{@link ([^}]+)}/g, "[$1]($1)")
                  .replaceAll("@see", "\n\n"),
              ]
                .filter(Boolean)
                .join("\n\n"),
              "  </Td>",
              "</Tr>",
            ]),
          "  </tbody>",
          "</Table>",
        ].join("\n"),
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
