import nodePolyfills from "@rolldown/plugin-node-polyfills";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

import pkg from "./package.json" with { type: "json" };
import { generateDataPlugin } from "./plugins/rollup-plugin-generate-data.mjs";

const env = process.env.NODE_ENV ?? "development";

export default defineConfig([
  {
    external: new RegExp(
      "^(?:" + Object.keys(pkg.dependencies).join("|") + ")(?:/.+)?$",
    ),
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "es",
      preserveModules: true,
    },
    plugins: [generateDataPlugin(), nodePolyfills()],
    transform: {
      define: {
        "process.env.NODE_ENV": JSON.stringify(env),
      },
      target: "esnext",
    },
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      dts({
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);
