import fg from "fast-glob";
import fs from "fs";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import createNextra from "nextra";
import docgen from "react-docgen-typescript";
import { visit } from "unist-util-visit";

import { nextraOptions } from "./nextra.config.mjs";

checkPageHeadings();
fs.mkdirSync("./data", { recursive: true });
writeDemoProps();
writeDemoImports();

const withNextra = createNextra(nextraOptions);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  experimental: {
    cssChunking: "strict",
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
};

// The site styles h2 as a small label that sits on an h3 (see README "Page
// Structure"), so content directly under an h2 renders cramped.
function checkPageHeadings() {
  const errors = [];
  for (const path of fg.globSync("./app/**/*.mdx")) {
    // Blank out frontmatter, which would otherwise parse as a setext h2, but
    // keep its newlines so reported line numbers stay right.
    const source = fs
      .readFileSync(path, "utf8")
      .replace(/^---\n[\s\S]*?\n---\n/, (match) => match.replace(/[^\n]/g, ""));
    const tree = fromMarkdown(source, {
      extensions: [mdxjs()],
      mdastExtensions: [mdxFromMarkdown()],
    });
    visit(tree, "heading", (node, index, parent) => {
      if (node.depth !== 2) {
        return;
      }
      let next = parent?.children[(index ?? 0) + 1];
      // An h3 may open a wrapper such as <Steps>.
      if (next?.type === "mdxJsxFlowElement") {
        next = next.children[0];
      }
      if (next?.type !== "heading" || next.depth !== 3) {
        errors.push(`${path}:${node.position?.start.line}`);
      }
    });
  }
  if (errors.length) {
    throw new Error(
      `Every h2 must be followed directly by an h3:\n${errors.join("\n")}`,
    );
  }
}

function writeDemoImports() {
  const demoPaths = fg.globSync("./demos/**/App.tsx");

  const demoEntries = demoPaths
    .map((path) => {
      // Convert "./demos/alert-dialog/async-usage/App.tsx" to "alert-dialog/async-usage"
      const key = path.replace("./demos/", "").replace("/App.tsx", "");
      return `  "${key}": import("@/demos/${key}/App"),`;
    })
    .sort()
    .join("\n");

  const content = `export const demos = {
${demoEntries}
};
`;

  fs.writeFileSync("./components/demo/demos.ts", content);
}

function writeDemoProps() {
  const parser = docgen.withCustomConfig("./tsconfig.json", {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldRemoveUndefinedFromOptional: true,
  });
  fs.writeFileSync(
    "./data/demos.json",
    JSON.stringify(parser.parse(fg.globSync("./demos/**/App.tsx"))),
  );
}

export default withNextra(nextConfig);
