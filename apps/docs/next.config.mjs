import { getDocs } from "@optiaxiom/shared";
import fg from "fast-glob";
import fs from "fs";
import createNextra from "nextra";
import docgen from "react-docgen-typescript";

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
  },
});

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
