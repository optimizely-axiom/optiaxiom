import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { readFileSync } from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

export function transformDemos(tree) {
  let id = 0;
  let needsImport = true;

  visit(
    tree,
    { name: "ax-demo", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const demoName = node.attributes.find(
        (attr) => attr.name === "name",
      ).value;
      const filePath = path.resolve(
        process.cwd(),
        "demos",
        demoName,
        "App.tsx",
      );
      const iframe = node.attributes.find(
        (attr) => attr.name === "iframe",
      )?.value;

      const demo = fromMarkdown(
        [
          needsImport &&
            `import { Demo as DemoRemark } from "@/components/demo";`,
          `import { App as App${id} } from "@/demos/${demoName}/App";`,
          `<DemoRemark component={App${id}} ${iframe ? `iframe=${JSON.stringify(iframe)}` : ""} />`,
        ]
          .filter(Boolean)
          .join("\n\n"),
        {
          extensions: [mdxjs()],
          mdastExtensions: [mdxFromMarkdown()],
        },
      );
      demo.children[demo.children.length - 1].children.push({
        lang: "tsx",
        type: "code",
        value: readFileSync(filePath, "utf8").trim(),
      });
      parent.children.splice(index, 1, ...demo.children);

      id++;
      needsImport = false;

      return index + demo.children.length;
    },
  );
}
