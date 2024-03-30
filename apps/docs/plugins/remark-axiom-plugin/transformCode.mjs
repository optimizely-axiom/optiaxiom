import { readFileSync } from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

export function transformCode(tree, file) {
  visit(
    tree,
    { name: "ax-code", type: "mdxJsxFlowElement" },
    (node, index, parent) => {
      const filePath = node.attributes.find(
        (attr) => attr.name === "file",
      ).value;
      const fileAbsPath = filePath.startsWith(".")
        ? path.resolve(file.dirname, filePath)
        : path.resolve(process.cwd(), "../../", filePath);

      parent.children.splice(index, 1, {
        lang: path.extname(fileAbsPath).slice(1),
        type: "code",
        value: readFileSync(fileAbsPath, "utf8").trim(),
      });
      return index + 1;
    },
  );
}
