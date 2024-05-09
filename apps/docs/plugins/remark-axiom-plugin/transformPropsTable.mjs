import fg from "fast-glob";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import docgen from "react-docgen-typescript";
import { visit } from "unist-util-visit";

export function transformPropsTable(propsConfig, tree) {
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
            "../../packages/react/src/**/{*.recipe.ts,sprinkles.ts,*.tsx}",
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
          needsImport &&
            `import { Table, Td, Th, Tr } from "@/components/table";`,
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
              '  <Td className="nx-whitespace-nowrap">',
              `**${prop.name}**`,
              "  </Td>",
              "  <Td>",
              [
                [
                  parseType(propsConfig, prop.type, prop.name, component),
                  ...(prop.defaultValue
                    ? ["=", `\`${prop.defaultValue.value}\``]
                    : []),
                ].join(" "),
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

function parseType(propsConfig, type, prop, component) {
  if (prop === "sx") {
    return `[Style Props](/styled-system/#sx-prop)`;
  }

  if (type.name === "enum") {
    for (const [key, { props: matchers }] of Object.entries(
      propsConfig.theme,
    )) {
      if (
        matchers.includes(prop) ||
        matchers.includes(`${component}[${prop}]`)
      ) {
        return themeLink(propsConfig, key);
      }
    }
  }

  return type.name === "enum" &&
    !["ReactNode"].includes(type.raw) &&
    type.raw?.startsWith("ResponsiveValue<")
    ? `\`ResponsiveValue<${type.value
        .slice(0, -2)
        .map(({ value }) => value)
        .join(" | ")}>\``
    : `\`${type.raw ?? type.name}\``;
}

function themeLink(propsConfig, key) {
  return `[\`theme.${key}\`](/styled-system${propsConfig.theme[key].path ?? "/theme/#design-tokens"})`;
}
