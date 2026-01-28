#!/usr/bin/env node
import fs from "fs";
import { resolveRefs } from "json-refs";
import { jsonSchemaToZod } from "json-schema-to-zod";
import path from "path";

import { getDocs } from "../src/index.mjs";

/**
 * @typedef {import('../src/index.mjs').ComponentDoc} ComponentDoc
 * @typedef {import('../src/index.mjs').Prop} Prop
 */

/**
 * @typedef {import('json-schema').JSONSchema7} JSONSchema7
 * @typedef {import('json-schema').JSONSchema7Definition} JSONSchema7Definition
 */

/**
 * @typedef {Object} ComponentConfig
 * @property {string[]} allowedProps - List of allowed prop names
 */

/**
 * @type {Record<string, ComponentConfig>}
 */
const BLOCK_COMPONENT_CONFIG = {
  Field: {
    allowedProps: ["children", "description", "info", "label", "required"],
  },
  Group: {
    allowedProps: ["alignItems", "children", "flexDirection"],
  },
  Heading: {
    allowedProps: ["children", "level"],
  },
  Input: {
    allowedProps: [
      "addonAfter",
      "addonBefore",
      "appearance",
      "name",
      "onValueChange",
      "placeholder",
      "type",
    ],
  },
  Link: {
    allowedProps: ["children", "href"],
  },
  Range: {
    allowedProps: ["marks", "max", "min", "step"],
  },
  Select: {
    allowedProps: ["children", "name", "options"],
  },
  SelectContent: {
    allowedProps: [],
  },
  SelectTrigger: {
    allowedProps: ["children"],
  },
  Separator: {
    allowedProps: [],
  },
  Text: {
    allowedProps: ["children"],
  },
  Textarea: {
    allowedProps: [
      "maxRows",
      "name",
      "onValueChange",
      "placeholder",
      "resize",
      "rows",
    ],
  },
};

/**
 * @type {Record<string, Record<string, JSONSchema7Definition>>}
 */
const PROP_TYPE_OVERRIDES = {
  Input: {
    onValueChange: {
      $ref: "#/definitions/BlockEventHandler",
      description: "Action triggered when input value changes",
    },
  },
  Range: {
    marks: {
      description: "The marks to display on the range steps.",
      items: {
        anyOf: [
          { type: "number" },
          {
            additionalProperties: false,
            properties: {
              label: {
                description: "The label for the mark",
                type: "string",
              },
              value: {
                description: "The value for the mark",
                type: "number",
              },
            },
            required: ["label", "value"],
            type: "object",
          },
        ],
      },
      type: "array",
    },
  },
  Select: {
    options: {
      description: "The select items/options we want to render.",
      items: {
        additionalProperties: false,
        properties: {
          execute: {
            $ref: "#/definitions/BlockEventHandler",
            description: "Action triggered when this option is selected",
          },
          label: {
            description: "String representation of items",
            type: "string",
          },
          value: {
            description: "Return a unique key for each item",
            type: "string",
          },
        },
        required: ["label", "value"],
        type: "object",
      },
      type: "array",
    },
  },
  SelectContent: {
    children: {
      $ref: "#/definitions/BlockNode",
    },
  },
  Textarea: {
    onValueChange: {
      $ref: "#/definitions/BlockEventHandler",
      description: "Action triggered when textarea value changes",
    },
  },
};

/**
 * Main function to generate the complete Adaptive Block document spec
 * @returns {JSONSchema7} Complete JSON Schema for Block documents
 */
function generateJsonSchema() {
  const docs = getDocs();

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    definitions: Object.entries(BLOCK_COMPONENT_CONFIG).reduce(
      (
        /** @type {Record<string, JSONSchema7Definition>} */ definitions,
        [componentName, { allowedProps }],
      ) => {
        const doc = docs.find(
          (doc) => doc.displayName === `@optiaxiom/react/${componentName}`,
        );
        if (!doc) {
          throw new Error(
            `Could not find documentation for component "${componentName}"`,
          );
        }

        /** @type {Record<string, JSONSchema7Definition>} */
        const properties = {
          $id: {
            description:
              "Unique identifier for targeting by actions (e.g., setVisibility)",
            type: "string",
          },
          $type: {
            const: `Block.${componentName}`,
          },
          $visible: {
            description:
              "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
            type: "boolean",
          },
        };
        const required = ["$type"];

        for (const prop of doc.props) {
          if (!(allowedProps.includes(prop.name) || prop.sprinkle)) {
            continue;
          }

          if (
            componentName in PROP_TYPE_OVERRIDES &&
            prop.name in PROP_TYPE_OVERRIDES[componentName]
          ) {
            properties[prop.name] =
              PROP_TYPE_OVERRIDES[componentName][prop.name];
          } else {
            properties[prop.name] = parsePropTypeToJsonSchema(prop);
          }
          if (prop.required) {
            required.push(prop.name);
          }
        }
        for (const prop of allowedProps) {
          if (!(prop in properties)) {
            throw new Error(
              `Could not find prop "${prop}" for component "${componentName}"`,
            );
          }
        }

        const blockComponentRef = {
          $ref: `#/definitions/Block${componentName}`,
        };

        definitions[`Block${componentName}`] = {
          additionalProperties: false,
          properties,
          required,
          type: "object",
        };

        const blockNode = definitions["BlockNode"];
        if (
          blockNode &&
          typeof blockNode === "object" &&
          Array.isArray(blockNode.anyOf)
        ) {
          blockNode.anyOf.push(blockComponentRef);

          const arrayType = blockNode.anyOf[0];
          if (
            arrayType &&
            typeof arrayType === "object" &&
            "items" in arrayType &&
            arrayType.items &&
            typeof arrayType.items === "object" &&
            "anyOf" in arrayType.items &&
            Array.isArray(arrayType.items.anyOf)
          ) {
            arrayType.items.anyOf.push(blockComponentRef);
          }
        }

        return definitions;
      },
      {
        BlockAction: {
          additionalProperties: false,
          properties: {
            $id: {
              description:
                "Unique identifier for targeting by actions (e.g., setVisibility)",
              type: "string",
            },
            $type: { const: "Block.Action" },
            $visible: {
              description:
                "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
              type: "boolean",
            },
            appearance: {
              anyOf: [
                { const: "default" },
                { const: "danger" },
                { const: "primary" },
                { const: "subtle" },
                { const: "danger-outline" },
                { const: "default-opal" },
                { const: "inverse" },
                { const: "primary-opal" },
              ],
              description:
                "Control the appearance by selecting between the different button types.",
            },
            children: {
              $ref: "#/definitions/BlockNode",
              description: "Button label",
            },
            onClick: {
              $ref: "#/definitions/BlockEventHandler",
              description: "Action triggered when button is clicked",
            },
          },
          required: ["$type", "children"],
          type: "object",
        },
        BlockCancelAction: {
          additionalProperties: false,
          properties: {
            $id: {
              description:
                "Unique identifier for targeting by actions (e.g., setVisibility)",
              type: "string",
            },
            $type: { const: "Block.CancelAction" },
            $visible: {
              description:
                "Whether element is visible (default: true). Elements with $visible: false are hidden until shown by an action.",
              type: "boolean",
            },
            children: {
              $ref: "#/definitions/BlockNode",
              description: "Button label (e.g., 'Cancel', 'Reject')",
            },
            placeholder: {
              description: "Placeholder text for the text input field",
              type: "string",
            },
          },
          required: ["$type"],
          type: "object",
        },
        BlockDocument: {
          additionalProperties: false,
          properties: {
            $type: { const: "Block.Document" },
            actions: {
              description: "Actions available for this document",
              items: {
                anyOf: [
                  { $ref: "#/definitions/BlockAction" },
                  { $ref: "#/definitions/BlockCancelAction" },
                ],
              },
              type: "array",
            },
            blocking: {
              description:
                "If true, hides chat prompt and forces user interaction with document. User can press ESC or close to abandon.",
              type: "boolean",
            },
            children: {
              anyOf: [{ $ref: "#/definitions/BlockNode" }],
            },
          },
          required: ["$type", "children"],
          type: "object",
        },
        BlockEventHandler: {
          anyOf: [
            {
              additionalProperties: false,
              description: "Server-side tool call",
              properties: {
                tool: {
                  description: "Name of registered tool to call",
                  type: "string",
                },
              },
              required: ["tool"],
              type: "object",
            },
            {
              additionalProperties: false,
              description: "Client-side setVisibility action",
              properties: {
                action: {
                  const: "setVisibility",
                  description: "Set visibility of target elements",
                },
                params: {
                  additionalProperties: { type: "boolean" },
                  description:
                    "Map of element IDs to visibility state (e.g., { 'step-2': true, 'step-1': false })",
                  type: "object",
                },
                when: {
                  description:
                    "Optional regex pattern - action only executes if value matches",
                  type: "string",
                },
              },
              required: ["action", "params"],
              type: "object",
            },
          ],
          description:
            "Handler for user interactions - either a tool call or client-side action",
        },
        BlockNode: {
          anyOf: [
            {
              items: {
                anyOf: [
                  { type: "string" },
                  { type: "number" },
                  { type: "boolean" },
                  { type: "null" },
                ],
              },
              type: "array",
            },
            { type: "string" },
            { type: "number" },
            { type: "boolean" },
            { type: "null" },
          ],
          description:
            "A Block node can be a string, number, boolean, null, a single element, or an array of these types (similar to ReactNode)",
        },
      },
    ),
    title: "Opal Block Document Specification",
  };
}

/**
 * Convert JSON Schema to Zod schema TypeScript code
 * @param {JSONSchema7} schema - The JSON Schema
 * @returns {Promise<string>} TypeScript code with Zod schemas
 */
async function generateZodSchemas(schema) {
  const lines = [];

  lines.push("// This file is auto-generated. Do not edit manually.");
  lines.push("// Run `pnpm block-spec` to regenerate.");
  lines.push("");
  lines.push('import { z } from "zod";');
  lines.push("");
  lines.push("type BlockNode = string | BlockElement | BlockElement[]");
  lines.push("");

  const components = [];

  for (const [name, def] of Object.entries(schema.definitions || {})) {
    if (typeof def !== "object") continue;
    if (name === "BlockNode") continue;

    const schemaName = `${name}Schema`;
    if (!["BlockDocument", "BlockEventHandler"].includes(name)) {
      components.push(name);
    }

    lines.push(
      jsonSchemaToZod(
        (
          await resolveRefs({
            ...def,
            definitions: {
              ...schema.definitions,
              BlockNode: {},
            },
          })
        ).resolved,
        {
          module: "esm",
          name: schemaName,
          noImport: true,
        },
      ),
    );
    if (name === "BlockEventHandler") {
      lines.push(`export type ${name} = z.infer<typeof ${schemaName}>;`);
    } else {
      lines.push(
        `export type ${name} = Omit<z.infer<typeof ${schemaName}>, "children"> & { children?: BlockNode };`,
      );
      lines.push(
        `export type ${name}Props = Omit<z.infer<typeof ${schemaName}>, "$id" | "$type" | "$visible">;`,
      );
    }
    lines.push("");
  }

  lines.push(
    'export const BlockElementSchema = z.discriminatedUnion("$type", [' +
      components.map((component) => `${component}Schema`).join(", ") +
      "]);",
  );
  lines.push(
    "type BlockElement = " +
      components.map((component) => component).join(" | ") +
      ";",
  );
  lines.push("");

  return lines.join("\n");
}

/**
 * Convert TypeScript type info to JSON Schema type definition
 * @param {Prop} prop - The prop from react-docgen-typescript
 * @returns {JSONSchema7Definition} JSON Schema property definition
 */
function parsePropTypeToJsonSchema({ description, name, type }) {
  if (type.raw === "ReactNode") {
    return {
      $ref: "#/definitions/BlockNode",
      description: description,
    };
  } else if (type.name === "enum") {
    if (type.raw === "number") {
      return {
        description: description,
        type: "number",
      };
    } else if (type.raw === "string") {
      return {
        description: description,
        type: "string",
      };
    } else if (type.raw === "boolean") {
      return {
        description: description,
        type: "boolean",
      };
    } else if (
      !type.raw?.startsWith("ConditionalStyleWithResponsiveArray<") &&
      type.raw?.includes("[]")
    ) {
      return {
        description: description,
        type: "array",
      };
    }

    // Check if any value is the TypeScript "string & {}" trick
    const hasStringFallback = type.value.some(
      /** @param {{ value: string }} v */
      (v) => v.value === "string & {}",
    );

    const values = /** @type {Array<{ value: string }>} */ (type.value)
      .filter((v) => !("description" in v) && v.value !== "string & {}") // Skip values with descriptions and the string fallback
      .map((v) => {
        return JSON.parse(v.value);
      })
      .filter(Boolean);

    return {
      anyOf: [
        ...values.map((value) => ({
          const: value,
        })),
        ...(hasStringFallback
          ? [{ type: /** @type {const} */ ("string") }]
          : []),
      ],
      description: description,
    };
  }

  if (["boolean", "number", "string"].includes(type.name)) {
    return {
      description: description,
      type: /** @type {"boolean" | "number" | "string"} */ (type.name),
    };
  }

  throw new Error(
    `Unsupported prop type: ${name} with type ${type.name || type.raw}`,
  );
}

// Generate JSON Schema
const jsonSchema = generateJsonSchema();
const jsonOutputPath = path.join(process.cwd(), "block-document-spec.json");
fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonSchema, null, 2) + "\n");
console.log(`Generated: ${jsonOutputPath}`);

// Generate Zod schemas
const zodSchemas = await generateZodSchemas(jsonSchema);
const zodOutputPath = path.join(
  process.cwd(),
  "packages/react/src/block-document/schemas.ts",
);
fs.writeFileSync(zodOutputPath, zodSchemas);
console.log(`Generated: ${zodOutputPath}`);
