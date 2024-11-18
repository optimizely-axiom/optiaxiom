import { theme } from "@optiaxiom/globals";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { visit } from "unist-util-visit";

export function transformDesignTokens(tree) {
  let needsImport = true;
  visit(
    tree,
    { name: "ax-design-tokens", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const tree = fromMarkdown(
        [
          needsImport && `import { Scale } from "@/components/scale";`,
          ...Object.entries(theme).map(([name, values]) =>
            [
              "",
              `### \`${name}\``,
              "",
              `<Scale hidePixels hidePreview values={${JSON.stringify(values)}} />`,
            ].join("\n"),
          ),
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
