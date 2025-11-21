import type { PropItem } from "react-docgen-typescript";

import type { Example, PropDefinition } from "../src/index.js";

export function parseExamplesFromTags(exampleTag?: string): Example[] {
  if (!exampleTag) {
    return [];
  }

  return exampleTag
    .split(/(?=^<caption>)/m)
    .filter(Boolean)
    .flatMap((block) => {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) {
        return [];
      }

      // Find the caption tags
      const captionStart = trimmedBlock.indexOf("<caption>");
      const captionEnd = trimmedBlock.indexOf("</caption>");

      if (captionStart === -1 || captionEnd === -1) {
        throw new Error(
          `Invalid example block format. Expected format:\n` +
            `@example <caption>Title</caption>\n` +
            `code here\n\n` +
            `Got:\n${trimmedBlock}`,
        );
      }

      const title = trimmedBlock
        .slice(captionStart + "<caption>".length, captionEnd)
        .trim();

      // Everything after </caption> is code (optionally wrapped in fences)
      let code = trimmedBlock.slice(captionEnd + "</caption>".length).trim();

      // Strip optional code fences if present
      const fenceMatch = code.match(/^```[a-z]*\n([\s\S]*)\n```$/);
      if (fenceMatch?.[1]) {
        code = fenceMatch[1];
      }

      if (title && code) {
        return [
          {
            code: code.trim(),
            title,
          },
        ];
      }

      return [];
    });
}

/**
 * Parse light-dark() CSS function to extract light mode value only
 */
export function parseLightDark(value: string) {
  const match = value.match(/light-dark\((.+?),\s*(.+?)\)/);
  if (!match) {
    return;
  }
  return match[1]?.trim();
}

export function parsePropDefinition(prop: PropItem): PropDefinition {
  let type = prop.type.raw || prop.type.name || "unknown";
  let extractedValues: Array<number | string> | undefined;

  // Helper to parse a value (handles JSON-stringified values)
  const parseValue = (val: string): number | string => {
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
    const values = (prop.type.value as Array<{ value: string }>)
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
    const values = (prop.type.value as Array<{ value: string }>)
      .filter((v) => !("description" in v)) // Skip values with descriptions
      .map((v) => parseValue(v.value))
      .filter((v) => v !== undefined && v !== null && v !== "");

    if (values.length > 0) {
      extractedValues = values;
    }
  }

  const propDef: PropDefinition = {
    description: prop.description || undefined,
    type,
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
 */
export function remToPx(rem: string): string {
  const value = parseFloat(rem);
  return `${Math.round(value * 16)}px`;
}

/**
 * Convert PascalCase to kebab-case
 * e.g., "AlertDialog" -> "alert-dialog"
 */
export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
