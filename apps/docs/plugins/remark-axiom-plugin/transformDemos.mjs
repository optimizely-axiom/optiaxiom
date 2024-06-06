import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import fs from "node:fs";
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
      const metaAttr = node.attributes.find(
        (attr) => attr.name === "meta",
      )?.value;
      const iframe = node.attributes.find(
        (attr) => attr.name === "iframe",
      )?.value;
      const height = node.attributes.find(
        (attr) => attr.name === "height",
      )?.value;

      const files = ["App.tsx"];
      const filesDir = path.resolve(process.cwd(), "demos", demoName);
      for (const file of fs.readdirSync(filesDir)) {
        if (
          !files.includes(file) &&
          (file.endsWith(".css") || file.endsWith(".tsx"))
        ) {
          files.push(file);
        }
      }

      let configExists = false;
      try {
        fs.statSync(`${filesDir}/config.ts`);
        configExists = true;
      } catch {
        /* empty */
      }

      const demo = fromMarkdown(
        [
          needsImport &&
            `import { Tabs as TabsRemark } from 'nextra/components';`,
          needsImport &&
            `import { Demo as DemoRemark } from "@/components/demo";`,
          `import { App as App${id} } from "@/demos/${demoName}/App";`,
          configExists &&
            `import config${id} from "@/demos/${demoName}/config";`,
          `<DemoRemark
            component={App${id}}
            ${configExists ? `controls={config${id}.controls}` : ""}
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
                    value: fs
                      .readFileSync(path.join(filesDir, fileName), "utf8")
                      .trim(),
                  },
                ],
                name: "TabsRemark.Tab",
                type: "mdxJsxFlowElement",
              })),
            }
          : {
              lang: "tsx",
              meta: metaAttr,
              type: "code",
              value: fs
                .readFileSync(path.join(filesDir, files[0]), "utf8")
                .trim(),
            },
      );
      parent.children.splice(index, 1, ...demo.children);

      id++;
      needsImport = false;

      return index + demo.children.length;
    },
  );
}
