import { createFilter } from "@rollup/pluginutils";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

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
        entryFileNames(chunk) {
          if (chunk.facadeModuleId.endsWith(".css")) {
            // Strip extra `.css` from chunk name if there are any
            return chunk.name.replace(".css", "") + ".css";
          }
          return "[name].js";
        },
        format: "es",
        preserveModules: true,
      },
    ],
    plugins: [
      esbuild({
        define: {
          "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV ?? "development",
          ),
        },
      }),
      stylePlugin({
        include: ["**/*.css"],
        async process(id) {
          return readFile(id, { encoding: "utf-8" });
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
    plugins: [dts()],
  },
]);

/** @returns {import('rollup').Plugin} */
function stylePlugin({
  exclude = [],
  include = [],
  process = async (_id) => null,
} = {}) {
  const filter = createFilter(include ?? [], exclude ?? []);

  return {
    load(id) {
      return filter(id) ? "console.log('PLACEHOLDER')" : null;
    },

    name: "rollup-plugin-style",

    async renderChunk(_code, chunk) {
      return filter(chunk.facadeModuleId)
        ? await process(chunk.facadeModuleId)
        : null;
    },
  };
}
