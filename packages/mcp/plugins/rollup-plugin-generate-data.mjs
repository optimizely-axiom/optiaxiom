import {
  generateComponents,
  generateGuides,
  generateIcons,
  generateTokens,
} from "./generators.mjs";

/** @returns {import('rollup').Plugin} */
export function generateDataPlugin() {
  const prefix = "\0virtual:mcp-data/";

  return {
    name: "mcp:generate-data",

    resolveId(id) {
      if (id === "#mcp/data") {
        return prefix + "index";
      }
      return null;
    },

    async load(id) {
      if (!id.startsWith(prefix)) {
        return null;
      }

      return `export const components = ${JSON.stringify(await generateComponents())};
export const guides = ${JSON.stringify(await generateGuides())};
export const icons = ${JSON.stringify(await generateIcons())};
export const tokens = ${JSON.stringify(await generateTokens())};
`;
    },
  };
}
