import { getDocs } from "@optiaxiom/shared";
import fg from "fast-glob";
import fs from "fs";
import createNextra from "nextra";
import docgen from "react-docgen-typescript";

import { nextraOptions } from "./nextra.config.mjs";

writeComponentProps();
writeComponentList();
writeDemoProps();
writeDemoImports();

const withNextra = createNextra(nextraOptions);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    cssChunking: "strict",
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
};

function writeComponentList() {
  const propsData = JSON.parse(fs.readFileSync("./data/props.json", "utf8"));

  const componentNames = propsData
    .map((doc) => doc.displayName.replace("@optiaxiom/react/", ""))
    .filter(Boolean)
    .sort();

  const componentEntries = componentNames
    .map((name) => `  ${name}: getProps("${name}"),`)
    .join("\n");

  const content = `import { getProps } from "./getProps";

export const components = {
${componentEntries}
};
`;

  fs.writeFileSync("./components/props-table/components.ts", content);
}

function writeComponentProps() {
  fs.writeFileSync(
    "./data/props.json",
    JSON.stringify(getDocs({ shouldExtractValuesFromUnion: true })),
  );
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
