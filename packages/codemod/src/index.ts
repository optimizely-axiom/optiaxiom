#!/usr/bin/env node
/* eslint-disable no-console */
import { execSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log(`
@optiaxiom/codemod - Codemods for migrating Axiom Design System code

Usage:
  npx @optiaxiom/codemod <transform> <path>

Available transforms:
  flex-to-stack    Migrate from Flex to Stack component

Examples:
  npx @optiaxiom/codemod flex-to-stack src/
  npx @optiaxiom/codemod flex-to-stack src/components/MyComponent.tsx

Options:
  --help, -h       Show this help message
  --dry           Dry run (no changes will be made)
  `);
  process.exit(0);
}

const [transform, ...restArgs] = args;

const availableTransforms = ["flex-to-stack"];

if (!availableTransforms.includes(transform)) {
  console.error(`Error: Unknown transform "${transform}"`);
  console.error(`Available transforms: ${availableTransforms.join(", ")}`);
  process.exit(1);
}

const transformPath = join(__dirname, `${transform}.js`);
const targetPath = restArgs.find((arg) => !arg.startsWith("--")) || ".";
const isDryRun = restArgs.includes("--dry");

const jscodeshiftArgs = [
  "-t",
  transformPath,
  targetPath,
  "--parser=tsx",
  "--extensions=tsx,ts,jsx,js",
];

if (isDryRun) {
  jscodeshiftArgs.push("--dry");
}

try {
  console.log(`Running ${transform} on ${targetPath}...`);
  execSync(`npx jscodeshift ${jscodeshiftArgs.join(" ")}`, {
    stdio: "inherit",
  });
  console.log("✓ Transformation complete!");
} catch (err) {
  console.error("Error running codemod:", err);
  process.exit(1);
}
