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
          fg.globSync("../../packages/globals/src/tokens/colors{,.doc}.ts", {
            ignore: ["**/*.spec.*"],
          }),
        );

      const light = docs.find((doc) => doc.displayName === "ColorsDoc");
      const dark = docs.find((doc) => doc.displayName === "ColorsDarkDoc");

      const tree = fromMarkdown(
        [
          needsImport &&
            `import { ColorTokens } from "@/components/color-tokens";`,
          "",
          `### Text`,
          "",
          `<ColorTokens
            dark={${JSON.stringify(dark.props)}}
            light={${JSON.stringify(light.props)}}
            namespace="fg"
          />`,
          "",
          `### Background`,
          "",
          `<ColorTokens
            dark={${JSON.stringify(dark.props)}}
            light={${JSON.stringify(light.props)}}
            namespace="bg"
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
