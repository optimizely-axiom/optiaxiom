import { getDocs } from "@optiaxiom/shared";
import fs from "fs";
import createNextra from "nextra";

import { remarkPlugin } from "./plugins/remark-axiom-plugin/remarkPlugin.mjs";

writeComponentProps();

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

export default withNextra(nextConfig);
