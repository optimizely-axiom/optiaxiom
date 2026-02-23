import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { captureScreenshot } from "./screenshots.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {import('playwright').BrowserContext} BrowserContext
 * @typedef {import('@optiaxiom/shared').Prop} PropItem
 * @typedef {import('../src/types.js').Example} Example
 * @typedef {import('../src/types.js').PropDefinition} PropDefinition
 */

/**
 * Parse demo files from apps/docs/demos/{component-name}/ folders
 * @param {string} componentName - The component name (will be converted to kebab-case)
 * @param {BrowserContext} context
 * @returns {Promise<Example[]>}
 */
export async function parseDemosFromFiles(componentName, context) {
  const demosPath = join(
    __dirname,
    "../../../apps/docs/demos",
    toKebabCase(componentName),
  );

  try {
    const folders = await readdir(demosPath, { withFileTypes: true });
    /** @type {Example[]} */
    const examples = [];

    for (const folder of folders) {
      if (!folder.isDirectory()) {
        continue;
      }

      const folderPath = join(demosPath, folder.name);

      try {
        // Read all files in the demo folder
        const files = await readdir(folderPath, { withFileTypes: true });
        /** @type {Record<string, string>} */
        const code = {};

        for (const file of files) {
          if (
            file.isFile() &&
            (file.name.endsWith(".tsx") || file.name.endsWith(".ts"))
          ) {
            const filePath = join(folderPath, file.name);
            const content = await readFile(filePath, "utf-8");
            code[file.name] = content;
          }
        }

        // Only add if we found at least one file
        if (Object.keys(code).length > 0) {
          examples.push(
            await captureScreenshot(context, componentName, {
              code,
              components: extractAxiomImports(code),
              title: folder.name,
            }),
          );
        }
      } catch {
        // Skip if folder can't be read
        continue;
      }
    }

    return examples;
  } catch {
    // Component has no demos
    return [];
  }
}

/**
 * Parse light-dark() CSS function to extract light mode value only
 * @param {string} value
 * @returns {string | undefined}
 */
export function parseLightDark(value) {
  const match = value.match(/light-dark\((.+?),\s*(.+?)\)/);
  if (!match) {
    return;
  }
  return match[1]?.trim();
}

/**
 * @param {PropItem} prop
 * @returns {PropDefinition}
 */
export function parsePropDefinition(prop) {
  let type = prop.type.raw || prop.type.name || "unknown";
  /** @type {Array<number | string> | undefined} */
  let extractedValues = undefined;

  // Helper to parse a value (handles JSON-stringified values)
  /** @param {string} val */
  const parseValue = (val) => {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  };

  // For responsive/conditional style props, extract the union values instead of the complex type
  if (
    type.startsWith("ConditionalStyleWithResponsiveArray<") &&
    prop.type.value
  ) {
    const values = /** @type {Array<{value: string, description?: string}>} */ (
      prop.type.value
    )
      .filter((v) => !("description" in v)) // Skip values with descriptions (they're not actual values)
      .map((v) => parseValue(v.value))
      .filter(Boolean);

    if (values.length > 0) {
      type = values.map((v) => JSON.stringify(v)).join(" | ");
      extractedValues = values;
    }
  }

  // Extract values from union types (e.g., "sm" | "md" | "lg")
  // Skip simple types like boolean, ReactNode, etc that aren't useful as enum values
  const skipTypes = [
    "boolean",
    "ReactNode",
    "ReactElement",
    "string",
    "number",
  ];
  if (
    !extractedValues &&
    !skipTypes.includes(type) &&
    prop.type.value &&
    Array.isArray(prop.type.value)
  ) {
    const values = /** @type {Array<{value: string, description?: string}>} */ (
      prop.type.value
    )
      .filter((v) => !("description" in v)) // Skip values with descriptions
      .map((v) => parseValue(v.value))
      .filter((v) => v !== undefined && v !== null && v !== "");

    if (values.length > 0) {
      extractedValues = values;
    }
  }

  /** @type {PropDefinition} */
  const propDef = {
    description: prop.description || undefined,
    type: extractedValues && extractedValues.length > 0 ? "enum" : type,
  };

  if (extractedValues && extractedValues.length > 0) {
    propDef.values = extractedValues;
  }

  if (prop.defaultValue) {
    propDef.default = prop.defaultValue.value;
  }

  if (prop.required) {
    propDef.required = true;
  }

  return propDef;
}

/**
 * Convert rem value to pixels
 * @param {string} rem
 * @returns {string}
 */
export function remToPx(rem) {
  const value = parseFloat(rem);
  return `${Math.round(value * 16)}px`;
}

/**
 * Convert PascalCase to kebab-case
 * @example "AlertDialog" -> "alert-dialog"
 * @param {string} str
 * @returns {string}
 */
export function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Extract Axiom component names imported from @optiaxiom/react across all files in an example.
 * @param {Record<string, string>} code - Mapping of filename to file contents
 * @returns {string[]}
 */
function extractAxiomImports(code) {
  /** @type {Set<string>} */
  const components = new Set();
  const importPattern =
    /import\s*\{([^}]+)\}\s*from\s*["']@optiaxiom\/react(?:\/[^"']+)?["']/g;

  for (const source of Object.values(code)) {
    let match;
    while ((match = importPattern.exec(source)) !== null) {
      for (const name of match[1].split(",")) {
        const trimmed = name.trim();
        if (trimmed) {
          components.add(trimmed);
        }
      }
    }
  }

  return [...components].sort();
}
