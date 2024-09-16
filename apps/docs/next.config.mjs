import createNextra from "nextra";

import { remarkPlugin } from "./plugins/remark-axiom-plugin/remarkPlugin.mjs";

const withNextra = createNextra({
  mdxOptions: {
    remarkPlugins: [remarkPlugin],
  },
  theme: "./theme.tsx",
  themeConfig: "./theme.config.tsx",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    useLightningcss: true,
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

export default withNextra(nextConfig);
