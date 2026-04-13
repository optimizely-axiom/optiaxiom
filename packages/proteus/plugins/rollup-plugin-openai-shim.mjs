import { build } from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const VIRTUAL_ID = "\0openai-shim-script";

/** @returns {import('rollup').Plugin} */
export function openaiShimPlugin() {
  const shimPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../src/proteus-bridge/openai-shim.ts",
  );

  let shimBundle = "";

  return {
    name: "proteus:openai-shim",

    async buildStart() {
      const result = await build({
        bundle: true,
        entryPoints: [shimPath],
        format: "iife",
        minify: true,
        platform: "browser",
        target: "es2020",
        write: false,
      });
      shimBundle = result.outputFiles[0].text;
    },

    resolveId(id) {
      if (id === "virtual:openai-shim-script") {
        return VIRTUAL_ID;
      }
      return null;
    },

    load(id) {
      if (id === VIRTUAL_ID) {
        const escaped = shimBundle
          .replace(/\\/g, "\\\\")
          .replace(/`/g, "\\`")
          .replace(/\$/g, "\\$");
        return `export const OPENAI_SHIM_SCRIPT = \`<script>${escaped}</script>\`;`;
      }
      return null;
    },
  };
}
