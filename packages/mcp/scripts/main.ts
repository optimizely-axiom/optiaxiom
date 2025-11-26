#!/usr/bin/env tsx

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  generateComponents,
  generateComponentsIndex,
  generateMetadataFile,
  generateTokens,
} from "./generators.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUTPUT_DIR = join(__dirname, "..", "data");
const COMPONENTS_DIR = join(OUTPUT_DIR, "components");

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(COMPONENTS_DIR, { recursive: true });

  const components = await generateComponents();
  for (const component of components) {
    await writeFile(
      join(COMPONENTS_DIR, `${component.name}.json`),
      JSON.stringify(component, null, 2),
    );
  }

  await writeFile(
    join(COMPONENTS_DIR, "index.ts"),
    generateComponentsIndex(components),
  );

  await writeFile(
    join(OUTPUT_DIR, "tokens.json"),
    JSON.stringify(await generateTokens(), null, 2),
  );

  await writeFile(
    join(OUTPUT_DIR, "metadata.json"),
    JSON.stringify(await generateMetadataFile(), null, 2),
  );

  console.log(`Generated metadata for ${components.length} components!`);
}

main().catch((err) => {
  console.error("Error generating metadata", err);
  process.exit(1);
});
