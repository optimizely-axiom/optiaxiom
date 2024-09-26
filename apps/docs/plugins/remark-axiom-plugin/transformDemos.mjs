import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import fs from "node:fs";
import path from "node:path";
import docgen from "react-docgen-typescript";
import { visit } from "unist-util-visit";

const parser = docgen.withCompilerOptions(
  { esModuleInterop: true },
  {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
  },
);

export function transformDemos(tree) {
  let needsImport = true;

  const imports = {};
  visit(tree, { type: "mdxjsEsm" }, (node) => {
    for (const item of node.data.estree.body) {
      if (item.type !== "ImportDeclaration") {
        continue;
      }

      for (const spec of item.specifiers) {
        imports[spec.local.name] = item.source.value;
      }
    }
  });

  visit(
    tree,
    { name: "Demo", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const component = node.attributes.find(
        (attr) => attr.name === "component",
      ).value.value;
      if (!(component in imports)) {
        return;
      }

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
      const filesDir = path.resolve(
        imports[component].replace("@", process.cwd()),
        component
          .replace(/^[A-Z]/, (m) => m.toLowerCase())
          .replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()),
      );
      for (const file of fs.readdirSync(filesDir)) {
        if (
          !files.includes(file) &&
          (file.endsWith(".css") ||
            file.endsWith(".ts") ||
            file.endsWith(".tsx"))
        ) {
          files.push(file);
        }
      }

      const docs = parser.parse(`${filesDir}/App.tsx`);

      const demo = fromMarkdown(
        [
          needsImport &&
            `import { Tabs as TabsRemark } from 'nextra/components';`,
          `<Demo
            component={${component}}
            propTypes={${JSON.stringify(docs.find((doc) => doc.displayName === "App")?.props)}}
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

      needsImport = false;

      return index + demo.children.length;
    },
  );
}
