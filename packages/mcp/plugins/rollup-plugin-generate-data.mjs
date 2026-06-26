import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "oxfmt";

import {
  generateComponents,
  generateGuides,
  generateIcons,
  generateTests,
  generateTokens,
} from "./generators.mjs";

/** @returns {import('rolldown').Plugin} */
export function generateDataPlugin() {
  const dataFile = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../src/data.json",
  );

  return {
    name: "mcp:generate-data",

    async load(id) {
      if (id !== dataFile) {
        return null;
      }

      // Regenerate the committed data on every build and write it back to
      // source. A `git diff --exit-code` in CI then fails when a change to
      // react/globals/shared alters the data without it being committed.
      const data = {
        components: await generateComponents(),
        guides: await generateGuides(),
        icons: await generateIcons(),
        tests: await generateTests(),
        tokens: await generateTokens(),
      };
      const code = (await format(id, JSON.stringify(data), { printWidth: 80 }))
        .code;
      fs.writeFileSync(id, code);

      return code;
    },
  };
}
