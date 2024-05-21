import { createFilter } from "@rollup/pluginutils";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { readFileSync } from "node:fs";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const env = process.env.NODE_ENV ?? "development";
const pkg = JSON.parse(readFileSync("./package.json"));
const bannerFilter = createFilter(["**/*.js"]);

export default defineConfig([
  {
    external: new RegExp(
      "^(?:" +
        Object.keys({
          ...pkg.dependencies,
          ...pkg.peerDependencies,
        }).join("|") +
        ")(?:/.+)?$",
    ),
    input: "src/index.ts",
    output: [
      {
        banner: async (chunk) => {
          if (bannerFilter(chunk.facadeModuleId)) {
            return '"use client";';
          }
          return "";
        },
        dir: "dist",
        format: "es",
        preserveModules: true,
      },
    ],
    plugins: [
      esbuild({
        define: {
          "process.env.NODE_ENV": JSON.stringify(env),
        },
      }),
      vanillaExtractPlugin(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: pkg.types,
      format: "es",
    },
    plugins: [dts({ compilerOptions: { types: ["node"] } })],
  },
]);
