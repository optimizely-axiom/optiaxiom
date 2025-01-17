import { getDocs } from "@optiaxiom/shared";
import fg from "fast-glob";
import fs from "fs";
import createNextra from "nextra";
import docgen from "react-docgen-typescript";

import { remarkPlugin } from "./plugins/remark-axiom-plugin/remarkPlugin.mjs";

writeComponentProps();
writeDemoProps();

const withNextra = createNextra({
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        dark: "night-owl",
        light: "min-light",
      },
    },
    remarkPlugins: [remarkPlugin],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@optiaxiom/react"],
  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
};

function writeComponentProps() {
  fs.writeFileSync(
    "./data/props.json",
    JSON.stringify(getDocs({ shouldExtractValuesFromUnion: true })),
  );
}

function writeDemoProps() {
  const parser = docgen.withCompilerOptions(
    {
      esModuleInterop: true,
      paths: {
        "@optiaxiom/react/unstable": [
          "../../packages/react/dist/unstable.d.ts",
        ],
      },
    },
    {
      savePropValueAsString: true,
      shouldExtractValuesFromUnion: true,
    },
  );
  fs.writeFileSync(
    "./data/demos.json",
    JSON.stringify(parser.parse(fg.globSync("./demos/**/App.tsx"))),
  );
}

export default withNextra(nextConfig);
