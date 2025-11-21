import json from "@rollup/plugin-json";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

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
    plugins: [
      generateDataPlugin(),
      esbuild({
        define: {
          "process.env.NODE_ENV": JSON.stringify(env),
        },
        target: "esnext",
      }),
      json(),
    ],
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
