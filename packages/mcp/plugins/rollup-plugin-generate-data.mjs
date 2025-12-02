import { chromium } from "playwright";

import {
  generateComponents,
  generateGuides,
  generateIcons,
  generateMetadataFile,
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

      const browser = await chromium.launch({ headless: true });
      try {
        const context = await browser.newContext({
          viewport: { height: 800, width: 1200 },
        });

        return `export const components = ${JSON.stringify(await generateComponents(context))};
export const guides = ${JSON.stringify(await generateGuides())};
export const icons = ${JSON.stringify(await generateIcons())};
export const metadata = ${JSON.stringify(await generateMetadataFile())};
export const tokens = ${JSON.stringify(await generateTokens())};
`;
      } finally {
        await browser.close();
      }
    },
  };
}
