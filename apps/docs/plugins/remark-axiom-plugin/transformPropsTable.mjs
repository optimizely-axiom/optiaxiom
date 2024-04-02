import fg from "fast-glob";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import docgen from "react-docgen-typescript";
import { visit } from "unist-util-visit";

export function transformPropsTable(tree) {
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
          fg.globSync("../../packages/react/src/**/*.tsx", {
            ignore: ["**/*.spec.*"],
          }),
        );

      const componentRaw = node.attributes.find(
        (attr) => attr.name === "component",
      ).value;
      const component = componentRaw.value ?? componentRaw;
      const excludeRaw = node.attributes.find(
        (attr) => attr.name === "exclude",
      )?.value;
      const exclude = excludeRaw
        ? JSON.parse(excludeRaw.value)
        : ["key", "ref"];
      const doc = docs.find(
        (doc) => doc.displayName === `@optiaxiom/react/${component}`,
      );
      if (!doc) {
        throw new Error(`Could not find component doc: ${component}`);
      }

      const tree = fromMarkdown(
        [
          `### \`${component}\` component props`,
          "",
          '<table className="nx-w-full nx-text-sm nx-text-left nx-mt-6">',
          '  <thead className="nx-text-xs nx-text-gray-700 nx-uppercase nx-bg-gray-100 dark:nx-bg-gray-50/10 dark:nx-text-gray-400">',
          "    <tr>",
          '      <th className="nx-px-3 nx-py-0.5" style={{ width: "25%" }}>',
          "        Name",
          "      </th>",
          '      <th className="nx-px-3 nx-py-0.5" style={{ width: "75%" }}>',
          "        Type",
          "      </th>",
          "    </tr>",
          "  </thead>",
          "  <tbody>",
          ...Object.entries(doc.props)
            .sort(([a], [b]) => a.localeCompare(b))
            .filter(
              ([, prop]) =>
                !exclude.includes(prop.name) &&
                prop.type.name !== "any" &&
                ((prop.declarations.length === 0 && component === "Box") ||
                  prop.declarations.find(
                    (decl) => decl.fileName === doc.filePath,
                  )),
            )
            .flatMap(([, prop]) => [
              '<tr className="nx-border-b">',
              '  <td className="nx-px-3 nx-py-2 nx-whitespace-nowrap" valign="top">',
              `**${prop.name}**`,
              "  </td>",
              '  <td className="nx-px-3 nx-py-2" valign="top">',
              [
                parseType(prop.type, prop.name),
                ...(prop.defaultValue
                  ? ["=", `\`${prop.defaultValue.value}\``]
                  : []),
                "<br/>",
              ].join(" "),
              prop.description,
              "  </td>",
              "</tr>",
            ]),
          "  </tbody>",
          "</table>",
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

      return index + tree.children.length;
    },
  );
}

function parseType(type, prop) {
  if (type.name === "enum") {
    switch (prop) {
      case "background":
      case "color":
        return "[`theme.colors`](/docs/tokens/#theme)";
      case "borderRadius":
        return "[`theme.radius`](/docs/tokens/#theme)";
      case "fontSize":
        return "[`theme.fontSizes`](/docs/tokens/#theme)";
      case "lineHeight":
        return "[`theme.lineHeights`](/docs/tokens/#theme)";
      case "gap":
      case "margin":
      case "marginBottom":
      case "marginLeft":
      case "marginRight":
      case "marginTop":
      case "marginX":
      case "padding":
      case "paddingBottom":
      case "paddingLeft":
      case "paddingRight":
      case "paddingTop":
      case "paddingX":
        return "[`theme.spacing`](/docs/tokens/#theme)";
      default:
        return `\`${(type.raw?.startsWith("ConditionalStyle<")
          ? type.value.slice(0, -1)
          : type.value
        )
          .map(({ value }) => value)
          .join(" | ")}\``;
    }
  }
  return `\`${type.raw ?? type.name}\``;
}
