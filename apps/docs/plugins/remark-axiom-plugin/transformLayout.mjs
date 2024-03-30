import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

export function transformLayout(tree, file) {
  visit(
    tree,
    { name: "ax-layout", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const dir = path.basename(file.dirname);
      const name = path.parse(file.basename).name;
      let component;
      let meta;
      try {
        fs.statSync(path.join(file.dirname, name)).isDirectory();
        component = name;
        meta = JSON.parse(
          fs.readFileSync(path.join(file.dirname, name, "_meta.json"), "utf-8"),
        );
      } catch {
        component = dir;
        meta = JSON.parse(
          fs.readFileSync(path.join(file.dirname, "_meta.json"), "utf-8"),
        );
      }

      const tree = fromMarkdown(
        [
          `import { Layout } from "@/components/layout";`,
          `<Layout tabs={${JSON.stringify(
            Object.entries(meta)
              .filter(([, def]) => def.display !== "hidden")
              .map(([name]) => name),
          )}} title="${component}" />`,
        ].join("\n\n"),
        {
          extensions: [mdxjs()],
          mdastExtensions: [mdxFromMarkdown()],
        },
      );
      parent.children.splice(index, 1, ...tree.children);

      return index + tree.children.length;
    },
  );
}
