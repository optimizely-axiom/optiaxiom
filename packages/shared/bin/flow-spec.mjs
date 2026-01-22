#!/usr/bin/env node
import fs from "fs";
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
const FLOW_COMPONENT_CONFIG = {
  Alert: {
    allowedProps: ["children", "intent"],
  },
  Badge: {
    allowedProps: ["children", "intent", "size"],
  },
  Box: {
    allowedProps: ["children"],
  },
  Checkbox: {
    allowedProps: ["children", "name"],
  },
  Code: {
    allowedProps: ["children"],
  },
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
    allowedProps: ["children", "options"],
  },
  Separator: {
    allowedProps: [],
  },
  Switch: {
    allowedProps: ["children", "name"],
  },
  Text: {
    allowedProps: ["children"],
  },
  Textarea: {
    allowedProps: ["maxRows", "name", "placeholder", "resize", "rows"],
  },
};

/**
 * Main function to generate the complete Flow document spec
 * @returns {JSONSchema7} Complete JSON Schema for Flow documents
 */
function generate() {
  const docs = getDocs();

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    definitions: Object.entries(FLOW_COMPONENT_CONFIG).reduce(
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
          $type: {
            const: `Flow.${componentName}`,
          },
        };
        const required = ["$type"];

        for (const prop of doc.props) {
          if (!(allowedProps.includes(prop.name) || prop.sprinkle)) {
            continue;
          }

          properties[prop.name] = parsePropTypeToJsonSchema(prop);
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

        const flowComponentRef = { $ref: `#/definitions/Flow${componentName}` };

        definitions[`Flow${componentName}`] = {
          additionalProperties: false,
          properties,
          required,
          type: "object",
        };

        const flowNode = definitions["FlowNode"];
        if (
          flowNode &&
          typeof flowNode === "object" &&
          Array.isArray(flowNode.anyOf)
        ) {
          flowNode.anyOf.push(flowComponentRef);

          const arrayType = flowNode.anyOf[0];
          if (
            arrayType &&
            typeof arrayType === "object" &&
            "items" in arrayType &&
            arrayType.items &&
            typeof arrayType.items === "object" &&
            "anyOf" in arrayType.items &&
            Array.isArray(arrayType.items.anyOf)
          ) {
            arrayType.items.anyOf.push(flowComponentRef);
          }
        }

        return definitions;
      },
      {
        FlowAction: {
          additionalProperties: false,
          properties: {
            $type: { const: "Flow.Action" },
            children: {
              $ref: "#/definitions/FlowNode",
              description: "Button label",
            },
            name: {
              description:
                "Unique identifier for this action (e.g., 'submit', 'confirm', 'create')",
              type: "string",
            },
          },
          required: ["$type", "name", "children"],
          type: "object",
        },
        FlowCancelAction: {
          additionalProperties: false,
          properties: {
            $type: { const: "Flow.CancelAction" },
            children: {
              $ref: "#/definitions/FlowNode",
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
        FlowDocument: {
          additionalProperties: false,
          properties: {
            $type: { const: "Flow.Document" },
            actions: {
              description: "Actions available for this document",
              items: {
                anyOf: [
                  { $ref: "#/definitions/FlowAction" },
                  { $ref: "#/definitions/FlowCancelAction" },
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
              anyOf: [{ $ref: "#/definitions/FlowNode" }],
            },
          },
          required: ["$type", "children"],
          type: "object",
        },
        FlowNode: {
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
            "A Flow node can be a string, number, boolean, null, a single element, or an array of these types (similar to ReactNode)",
        },
      },
    ),
    title: "Opal Flow Document Specification",
  };
}

/**
 * Convert TypeScript type info to JSON Schema type definition
 * @param {Prop} prop - The prop from react-docgen-typescript
 * @returns {JSONSchema7Definition} JSON Schema property definition
 */
function parsePropTypeToJsonSchema({ description, name, type }) {
  if (type.raw === "ReactNode") {
    return {
      $ref: "#/definitions/FlowNode",
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
      if (type.raw?.includes("SelectOption[]")) {
        return {
          description: description,
          items: {
            additionalProperties: false,
            properties: {
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
        };
      }

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

const outputPath = path.join(process.cwd(), "flow-document-spec.json");
fs.writeFileSync(outputPath, JSON.stringify(generate(), null, 2) + "\n");
console.log(`Generated: ${outputPath}`);
