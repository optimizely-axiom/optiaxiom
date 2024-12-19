import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { visit } from "unist-util-visit";

import { docs } from "./docs.mjs";

export function transformDesignTokens(tree) {
  visit(
    tree,
    { name: "Scale", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const values = node.attributes.find(
        (attr) => attr.name === "values",
      ).value;
      if (typeof values !== "string") {
        return;
      }

      const doc = docs.find(
        (doc) => doc.displayName === "@optiaxiom/react/Box",
      );
      if (!doc) {
        throw new Error("Could not find component doc: Box");
      }
      const prop = doc.props.find((prop) => prop.name === values);
      if (!prop) {
        throw new Error(`Could not find prop type: ${values}`);
      }

      const tree = fromMarkdown(`<Scale prop={${JSON.stringify(prop)}} />`, {
        extensions: [mdxjs()],
        mdastExtensions: [mdxFromMarkdown()],
      });
      visit(tree, { type: "mdxJsxFlowElement" }, (node) => {
        node.data = { _mdxExplicitJsx: true };
      });
      visit(tree, { name: "Scale", type: "mdxJsxFlowElement" }, (clone) => {
        clone.attributes.push(...node.attributes);
      });
      parent.children.splice(index, 1, ...tree.children);

      return index + tree.children.length;
    },
  );
}
