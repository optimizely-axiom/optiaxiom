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
      const filesAttr = node.attributes.find((attr) => attr.name === "files");
      const iframe = node.attributes.find(
        (attr) => attr.name === "iframe",
      )?.value;
      const height = node.attributes.find(
        (attr) => attr.name === "height",
      )?.value;

      const files = filesAttr
        ? [
            "App.tsx",
            ...filesAttr.value.data.estree.body[0].expression.elements.map(
              (el) => el.value,
            ),
          ]
        : ["App.tsx"];
      const filesDir = path.resolve(process.cwd(), "demos", demoName);

      const demo = fromMarkdown(
        [
          needsImport &&
            `import { Tabs as TabsRemark } from 'nextra/components';`,
          needsImport &&
            `import { Demo as DemoRemark } from "@/components/demo";`,
          `import { App as App${id} } from "@/demos/${demoName}/App";`,
          `<DemoRemark
            component={App${id}}
            ${iframe ? `iframe=${JSON.stringify(iframe)}` : ""}
            ${height ? `height=${JSON.stringify(height)}` : ""}
          />`,
        ]
          .filter(Boolean)
          .join("\n\n"),
        {
          extensions: [mdxjs()],
          mdastExtensions: [mdxFromMarkdown()],
        },
      );
      demo.children[demo.children.length - 1].children.push(
        files.length > 1
          ? {
              ...fromMarkdown(
                `<TabsRemark items={${JSON.stringify(files)}} />`,
                {
                  extensions: [mdxjs()],
                  mdastExtensions: [mdxFromMarkdown()],
                },
              ).children[0],
              children: files.map((fileName) => ({
                children: [
                  {
                    lang: path.extname(fileName).slice(1),
                    type: "code",
                    value: readFileSync(
                      path.join(filesDir, fileName),
                      "utf8",
                    ).trim(),
                  },
                ],
                name: "TabsRemark.Tab",
                type: "mdxJsxFlowElement",
              })),
            }
          : {
              lang: "tsx",
              type: "code",
              value: readFileSync(path.join(filesDir, files[0]), "utf8").trim(),
            },
      );
      parent.children.splice(index, 1, ...demo.children);

      id++;
      needsImport = false;

      return index + demo.children.length;
    },
  );
}
