import fg from "fast-glob";
import fs from "fs";
import createNextra from "nextra";
import docgen from "react-docgen-typescript";

import { nextraOptions } from "./nextra.config.mjs";

fs.mkdirSync("./data", { recursive: true });
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
