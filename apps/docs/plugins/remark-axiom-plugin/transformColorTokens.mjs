import fg from "fast-glob";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import docgen from "react-docgen-typescript";
import { visit } from "unist-util-visit";

export function transformColorTokens(tree) {
  let needsImport = true;
  visit(
    tree,
    { name: "ax-color-tokens", type: "mdxJsxFlowElement" },
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
          fg.globSync("../../packages/react/src/tokens/colors{,.doc}.ts", {
            ignore: ["**/*.spec.*"],
          }),
        );

      const doc = docs.find((doc) => doc.displayName === "ColorsDoc");

      const tree = fromMarkdown(
        [
          needsImport &&
            `import { ColorTokens } from "@/components/color-tokens";`,
          "",
          `### Text`,
          "",
          `<ColorTokens
            namespace="fg"
            props={${JSON.stringify(doc.props)}}
          />`,
          "",
          `### Background`,
          "",
          `<ColorTokens
            namespace="bg"
            props={${JSON.stringify(doc.props)}}
          />`,
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
