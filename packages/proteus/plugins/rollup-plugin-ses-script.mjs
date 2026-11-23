import { build } from "esbuild";

const VIRTUAL_ID = "\0ses-script";

/**
 * Bundles `ses` into a string so the script worker can run it from a Blob URL
 * (see `src/proteus-script/workerScript.ts`).
 *
 * @returns {import('rollup').Plugin}
 */
export function sesScriptPlugin() {
  let sesBundle = "";

  return {
    name: "proteus:ses-script",

    async buildStart() {
      const result = await build({
        bundle: true,
        format: "iife",
        minify: true,
        platform: "browser",
        stdin: { contents: 'import "ses";', resolveDir: import.meta.dirname },
        target: "es2020",
        write: false,
      });
      sesBundle = result.outputFiles[0].text;
    },

    resolveId(id) {
      if (id === "virtual:ses-script") {
        return VIRTUAL_ID;
      }
      return null;
    },

    load(id) {
      if (id === VIRTUAL_ID) {
        return `export const SES_SCRIPT = ${JSON.stringify(sesBundle)};`;
      }
      return null;
    },
  };
}
