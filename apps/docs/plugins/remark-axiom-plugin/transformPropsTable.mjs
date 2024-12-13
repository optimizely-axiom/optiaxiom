import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { visit } from "unist-util-visit";

import { docs } from "./docs.mjs";

export function transformPropsTable(tree) {
  let needsImport = true;

  visit(
    tree,
    { name: "PropsTable", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const component = node.attributes.find(
        (attr) => attr.name === "component",
      ).value.value;
      const doc = docs.find(
        (doc) => doc.displayName === `@optiaxiom/react/${component}`,
      );
      if (!doc) {
        throw new Error(`Could not find component doc: ${component}`);
      }

      const tree = fromMarkdown(
        [
          needsImport &&
            `import { PropTypeDescription } from "@/components/prop-type";`,
          "",
          `### \`${component}\``,
          "",
          `<PropsTable
            propItems={${JSON.stringify(doc.props)}}
          >`,
          ...Object.values(doc.props).flatMap((prop) =>
            prop.description
              ? [
                  `<PropTypeDescription name="${prop.name}">`,
                  prop.description
                    .replaceAll(/{@link ([^\s}]+)(?:\s([^}]+))}/g, "[$2]($1)")
                    .replaceAll(/{@link ([^}]+)}/g, "[$1]($1)")
                    .replaceAll(
                      "https://optimizely-axiom.github.io/optiaxiom",
                      "",
                    )
                    .replaceAll(/@example .+/g, "\n\n")
                    .replaceAll("@see", "\n\n"),
                  "</PropTypeDescription>",
                ]
              : [],
          ),
          "</PropsTable>",
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
      visit(
        tree,
        { name: "PropsTable", type: "mdxJsxFlowElement" },
        (clone) => {
          clone.attributes.push(...node.attributes);
        },
      );
      parent.children.splice(index, 1, ...tree.children);

      needsImport = false;

      return index + tree.children.length;
    },
  );
}
