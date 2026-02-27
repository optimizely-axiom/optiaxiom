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
 * @property {object} [example] - Example instance for tooling (e.g., designer insert templates)
 * @property {string} [extends] - Base Axiom component this extends (e.g., "Button", "Box")
 * @property {string[]} [requiredProps] - List of props that should be marked as required
 */

/**
 * @type {Record<string, ComponentConfig>}
 */
const PROTEUS_COMPONENT_CONFIG = {
  Action: {
    allowedProps: ["appearance", "children", "onClick"],
    example: { appearance: "primary", children: "Action" },
    extends: "Button",
  },
  CancelAction: {
    allowedProps: ["children", "placeholder"],
    example: { children: "Cancel" },
    extends: "Button",
  },
  Field: {
    allowedProps: ["children", "description", "info", "label", "required"],
    example: {
      children: { $type: "Input", name: "field_name" },
      label: "Field Label",
    },
  },
  Group: {
    allowedProps: ["alignItems", "children", "flexDirection"],
    example: { children: [], flexDirection: "column", gap: "16" },
  },
  Heading: {
    allowedProps: ["children", "level"],
    example: { children: "New heading", level: "2" },
  },
  Image: {
    allowedProps: ["alt", "src"],
    example: { alt: "Placeholder", src: "https://placehold.co/600x400" },
    extends: "Box",
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
    example: { name: "field_name", placeholder: "Enter value" },
  },
  Link: {
    allowedProps: ["children", "href"],
    example: { children: "Link text", href: "https://example.com" },
  },
  Map: {
    allowedProps: ["path", "children"],
    example: {
      children: { $type: "Text", children: "Item" },
      path: "/items",
    },
    extends: "Fragment",
    requiredProps: ["path"],
  },
  Range: {
    allowedProps: ["marks", "max", "min", "step"],
    example: { max: 100, min: 0, step: 1 },
  },
  Select: {
    allowedProps: ["children", "name", "options"],
    example: {
      children: [
        { $type: "SelectTrigger", w: "full" },
        { $type: "SelectContent" },
      ],
      name: "select_field",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
    },
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
  Show: {
    allowedProps: ["when", "children"],
    example: {
      children: { $type: "Text", children: "Shown conditionally" },
      when: { "!!": { $type: "Value", path: "/field_name" } },
    },
    extends: "Fragment",
  },
  Text: {
    allowedProps: ["children"],
    example: { children: "New text" },
  },
  Textarea: {
    allowedProps: ["maxRows", "name", "placeholder", "resize", "rows"],
    example: { name: "field_name", placeholder: "Enter text" },
  },
  Value: {
    allowedProps: ["path"],
    example: { path: "/field_name" },
    extends: "Fragment",
    requiredProps: ["path"],
  },
};

/**
 * Main function to generate the complete Adaptive Proteus document spec
 * @param {boolean} [additionalProperties=false] - Whether to allow additional properties in the schema
 * @returns {JSONSchema7} Complete JSON Schema for Proteus documents
 */
function generateJsonSchema(additionalProperties = false) {
  const docs = getDocs();

  // Extract all sprinkle props once to create a shared definition
  const sprinkleProps = new Map();
  for (const doc of docs) {
    for (const prop of doc.props) {
      if (prop.sprinkle && !sprinkleProps.has(prop.name)) {
        sprinkleProps.set(prop.name, parsePropTypeToJsonSchema(prop));
      }
    }
  }

  const PROP_TYPE_OVERRIDES = getPropTypeOverrides(additionalProperties);

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    definitions: Object.entries(PROTEUS_COMPONENT_CONFIG).reduce(
      (
        /** @type {Record<string, JSONSchema7Definition>} */ definitions,
        [
          componentName,
          {
            allowedProps,
            example,
            extends: extendsComponent,
            requiredProps = [],
          },
        ],
      ) => {
        // For components that extend another component, find the base component docs
        const baseComponentName = extendsComponent || componentName;
        const doc =
          baseComponentName === "Fragment"
            ? { props: [] }
            : docs.find(
                (doc) =>
                  doc.displayName === `@optiaxiom/react/${baseComponentName}`,
              );
        if (!doc) {
          throw new Error(
            `Could not find documentation for component "${baseComponentName}"${extendsComponent ? ` (extended by "${componentName}")` : ""}`,
          );
        }

        /** @type {Record<string, JSONSchema7Definition>} */
        const properties = {
          $type: {
            const: componentName,
          },
        };
        const required = ["$type"];

        for (const prop of doc.props) {
          if (!(allowedProps.includes(prop.name) || prop.sprinkle)) {
            continue;
          }

          if (prop.sprinkle) {
            // Reference the shared sprinkle prop definition
            properties[prop.name] = {
              $ref: `#/definitions/SprinkleProp_${prop.name}`,
            };
          } else {
            properties[prop.name] = parsePropTypeToJsonSchema(prop);
          }
          if (prop.required) {
            required.push(prop.name);
          }
        }

        if (componentName in PROP_TYPE_OVERRIDES) {
          for (const [propName, propSchema] of Object.entries(
            PROP_TYPE_OVERRIDES[componentName],
          )) {
            if (allowedProps.includes(propName)) {
              properties[propName] = propSchema;
            }
          }
        }

        // Mark props as required if specified in config
        if (requiredProps) {
          for (const propName of requiredProps) {
            if (!required.includes(propName)) {
              required.push(propName);
            }
          }
        }

        for (const prop of allowedProps) {
          if (!(prop in properties)) {
            throw new Error(
              `Could not find prop "${prop}" for component "${componentName}"`,
            );
          }
        }

        const proteusComponentRef = {
          $ref: `#/definitions/Proteus${componentName}`,
        };

        definitions[`Proteus${componentName}`] = {
          ...(additionalProperties ? {} : { additionalProperties: false }),
          ...(example
            ? { examples: [{ $type: componentName, ...example }] }
            : {}),
          properties,
          required,
          type: "object",
        };

        const proteusElement = definitions["ProteusElement"];
        if (
          proteusElement &&
          typeof proteusElement === "object" &&
          Array.isArray(proteusElement.anyOf)
        ) {
          proteusElement.anyOf.push(proteusComponentRef);
        }

        return definitions;
      },
      {
        // Add shared sprinkle prop definitions
        ...Object.fromEntries(
          Array.from(sprinkleProps.entries()).map(([name, schema]) => [
            `SprinkleProp_${name}`,
            schema,
          ]),
        ),
        ProteusAtomicCondition: {
          anyOf: [
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                "!=": {
                  description: "Inequality comparison",
                  items: {
                    anyOf: [
                      { type: "string" },
                      { type: "number" },
                      { type: "boolean" },
                      { type: "null" },
                      { $ref: "#/definitions/ProteusValue" },
                    ],
                  },
                  maxItems: 2,
                  minItems: 2,
                  type: "array",
                },
              },
              required: ["!="],
              type: "object",
            },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                "<": {
                  description: "Less than comparison",
                  items: {
                    anyOf: [
                      { type: "string" },
                      { type: "number" },
                      { type: "boolean" },
                      { type: "null" },
                      { $ref: "#/definitions/ProteusValue" },
                    ],
                  },
                  maxItems: 2,
                  minItems: 2,
                  type: "array",
                },
              },
              required: ["<"],
              type: "object",
            },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                "<=": {
                  description: "Less than or equal comparison",
                  items: {
                    anyOf: [
                      { type: "string" },
                      { type: "number" },
                      { type: "boolean" },
                      { type: "null" },
                      { $ref: "#/definitions/ProteusValue" },
                    ],
                  },
                  maxItems: 2,
                  minItems: 2,
                  type: "array",
                },
              },
              required: ["<="],
              type: "object",
            },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                "==": {
                  description: "Equality comparison",
                  items: {
                    anyOf: [
                      { type: "string" },
                      { type: "number" },
                      { type: "boolean" },
                      { type: "null" },
                      { $ref: "#/definitions/ProteusValue" },
                    ],
                  },
                  maxItems: 2,
                  minItems: 2,
                  type: "array",
                },
              },
              required: ["=="],
              type: "object",
            },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                ">": {
                  description: "Greater than comparison",
                  items: {
                    anyOf: [
                      { type: "string" },
                      { type: "number" },
                      { type: "boolean" },
                      { type: "null" },
                      { $ref: "#/definitions/ProteusValue" },
                    ],
                  },
                  maxItems: 2,
                  minItems: 2,
                  type: "array",
                },
              },
              required: [">"],
              type: "object",
            },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                ">=": {
                  description: "Greater than or equal comparison",
                  items: {
                    anyOf: [
                      { type: "string" },
                      { type: "number" },
                      { type: "boolean" },
                      { type: "null" },
                      { $ref: "#/definitions/ProteusValue" },
                    ],
                  },
                  maxItems: 2,
                  minItems: 2,
                  type: "array",
                },
              },
              required: [">="],
              type: "object",
            },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                "!!": {
                  anyOf: [
                    { type: "string" },
                    { type: "number" },
                    { type: "boolean" },
                    { type: "null" },
                    { $ref: "#/definitions/ProteusValue" },
                  ],
                  description:
                    "Truthy check - returns true if value is truthy (not null, undefined, false, 0, or empty string)",
                },
              },
              required: ["!!"],
              type: "object",
            },
          ],
          description:
            "Simple comparison condition - single operator only (used in OR arrays to avoid recursion)",
        },
        ProteusCondition: {
          anyOf: [
            { $ref: "#/definitions/ProteusAtomicCondition" },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                or: {
                  description:
                    "Logical OR - returns true if any condition is true",
                  items: {
                    anyOf: [
                      {
                        ...(additionalProperties
                          ? {}
                          : { additionalProperties: false }),
                        properties: {
                          and: {
                            description:
                              "Logical AND - returns true if all conditions are true",
                            items: {
                              $ref: "#/definitions/ProteusAtomicCondition",
                            },
                            minItems: 1,
                            type: "array",
                          },
                        },
                        required: ["and"],
                        type: "object",
                      },
                      { $ref: "#/definitions/ProteusAtomicCondition" },
                    ],
                  },
                  minItems: 1,
                  type: "array",
                },
              },
              required: ["or"],
              type: "object",
            },
          ],
          description:
            "Condition for Show component. Can be a comparison operator, logical AND, or logical OR. Supports nesting.",
        },
        ProteusDocument: {
          ...(additionalProperties ? {} : { additionalProperties: false }),
          examples: [
            {
              $type: "Document",
              appName: "Opal",
              body: [],
              title: "New Document",
            },
            {
              $type: "Document",
              actions: [
                {
                  $type: "Action",
                  appearance: "primary",
                  children: "Submit",
                  onClick: { tool: "submit_feedback" },
                },
              ],
              appName: "Opal",
              body: [
                {
                  $type: "Group",
                  children: [
                    {
                      $type: "Field",
                      children: {
                        $type: "Input",
                        name: "name",
                        placeholder: "Enter your name",
                      },
                      label: "Your Name",
                    },
                    {
                      $type: "Field",
                      children: {
                        $type: "Textarea",
                        name: "feedback",
                        placeholder: "What's on your mind?",
                        rows: 4,
                      },
                      label: "Feedback",
                    },
                  ],
                  flexDirection: "column",
                  gap: "16",
                },
              ],
              subtitle: "We'd love to hear from you",
              title: "Submit Feedback",
            },
            {
              $type: "Document",
              actions: [
                {
                  $type: "Action",
                  appearance: "primary",
                  children: "Create Test Plan",
                  onClick: { tool: "create_test_plan" },
                },
              ],
              appName: "Opal",
              body: [
                {
                  $type: "Group",
                  children: [
                    {
                      $type: "Heading",
                      children: "1. Configure your test",
                      fontSize: "md",
                      fontWeight: "600",
                      level: "2",
                    },
                    {
                      $type: "Field",
                      children: {
                        $type: "Select",
                        children: [
                          { $type: "SelectTrigger", w: "full" },
                          { $type: "SelectContent" },
                        ],
                        name: "target_by",
                        options: [
                          { label: "URL", value: "url" },
                          { label: "CSS Selector", value: "selector" },
                        ],
                      },
                      label: "Target by",
                    },
                    {
                      $type: "Show",
                      children: {
                        $type: "Field",
                        children: {
                          $type: "Input",
                          name: "url",
                          placeholder: "https://example.com",
                        },
                        label: "URL",
                      },
                      when: {
                        "==": [{ $type: "Value", path: "/target_by" }, "url"],
                      },
                    },
                    {
                      $type: "Show",
                      children: {
                        $type: "Field",
                        children: {
                          $type: "Input",
                          name: "selector",
                          placeholder: "#main-content",
                        },
                        label: "CSS Selector",
                      },
                      when: {
                        "==": [
                          { $type: "Value", path: "/target_by" },
                          "selector",
                        ],
                      },
                    },
                  ],
                  flexDirection: "column",
                  gap: "16",
                },
              ],
              title: "Create Test Plan",
            },
          ],
          properties: {
            $type: { const: "Document" },
            actions: {
              anyOf: [{ $ref: "#/definitions/ProteusNode" }],
              description: "Actions available for this document",
            },
            appIcon: {
              description: "A visual representation of the application",
              type: "string",
            },
            appName: {
              description: "The official name of the application",
              type: "string",
            },
            blocking: {
              description:
                "If true, hides chat prompt and forces user interaction with document. User can press ESC or close to abandon.",
              type: "boolean",
            },
            body: {
              anyOf: [{ $ref: "#/definitions/ProteusNode" }],
            },
            subtitle: {
              description:
                "A brief description or tagline that provides additional context about the Proteus document's purpose.",
              type: "string",
            },
            title: {
              description:
                "A concise heading that encapsulates the essence of the Proteus document's content or intended action.",
              type: "string",
            },
          },
          required: ["$type", "appName", "body", "title"],
          type: "object",
        },
        ProteusElement: {
          anyOf: [],
          description:
            "A single Proteus UI component element identified by its $type discriminator",
        },
        ProteusEventHandler: {
          anyOf: [
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
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
              ...(additionalProperties ? {} : { additionalProperties: false }),
              description: "Client-side message action",
              properties: {
                message: {
                  description: "Message to send to LLM via sendNewMessage()",
                  type: "string",
                },
              },
              required: ["message"],
              type: "object",
            },
          ],
          description:
            "Handler for user interactions - either a server-side tool call or client-side message",
        },
        ProteusNode: {
          anyOf: [
            {
              items: {
                anyOf: [
                  { type: "string" },
                  { type: "number" },
                  { type: "boolean" },
                  { type: "null" },
                  { $ref: "#/definitions/ProteusElement" },
                ],
              },
              type: "array",
            },
            { type: "string" },
            { type: "number" },
            { type: "boolean" },
            { type: "null" },
            { $ref: "#/definitions/ProteusElement" },
          ],
          description:
            "A Proteus node can be a string, number, boolean, null, a single element, or an array of these types (similar to ReactNode)",
        },
      },
    ),
    title: "Opal Proteus Document Specification",
  };
}

/**
 * Generate minimal TypeScript types + safeParse wrappers using @cfworker/json-schema
 * @returns {string} TypeScript code
 */
function generateTypeScriptTypes() {
  const lines = [];

  lines.push("// This file is auto-generated. Do not edit manually.");
  lines.push("// Run `pnpm proteus-spec` to regenerate.");
  lines.push("");
  lines.push('import { Validator } from "@cfworker/json-schema";');
  lines.push("");
  lines.push("import proteusDocumentSpec from './proteus-document-spec.json';");
  lines.push("");

  // --- ProteusEventHandler ---
  lines.push("// --- ProteusEventHandler ---");
  lines.push("");
  lines.push("export type ProteusEventHandler =");
  lines.push("  | { tool: string }");
  lines.push("  | { message: string };");
  lines.push("");

  // --- ProteusDocument ---
  lines.push("// --- ProteusDocument ---");
  lines.push("");
  lines.push("export interface ProteusDocument {");
  lines.push('  $type: "Document";');
  lines.push("  [key: string]: unknown;");
  lines.push("  actions?: unknown;");
  lines.push("  appIcon?: string;");
  lines.push("  appName: string;");
  lines.push("  blocking?: boolean;");
  lines.push("  body: unknown;");
  lines.push("  subtitle?: string;");
  lines.push("  title: string;");
  lines.push("}");
  lines.push("");

  // --- ProteusElement (discriminated union for switch exhaustiveness) ---
  lines.push(
    "// --- ProteusElement (discriminated union for switch exhaustiveness) ---",
  );
  lines.push("");
  lines.push("export type ProteusElement =");
  const componentNames = Object.keys(PROTEUS_COMPONENT_CONFIG);
  componentNames.forEach((name, index) => {
    const separator = index < componentNames.length - 1 ? "" : ";";
    lines.push(`  | { $type: "${name}"; [key: string]: unknown }${separator}`);
  });
  lines.push("");

  // --- safeParse ---
  lines.push("// --- safeParse ---");
  lines.push("");
  lines.push("const documentValidator = new Validator(");
  lines.push(
    '  { $ref: "#/definitions/ProteusDocument", definitions: proteusDocumentSpec.definitions } as any, // eslint-disable-line @typescript-eslint/no-explicit-any',
  );
  lines.push('  "7",');
  lines.push(");");
  lines.push("");
  lines.push("const elementValidator = new Validator(");
  lines.push(
    '  { $ref: "#/definitions/ProteusNode", definitions: proteusDocumentSpec.definitions } as any, // eslint-disable-line @typescript-eslint/no-explicit-any',
  );
  lines.push('  "7",');
  lines.push(");");
  lines.push("");
  lines.push("type SafeParseResult<T> =");
  lines.push("  | { success: true; data: T }");
  lines.push("  | { success: false; error: unknown[] };");
  lines.push("");
  lines.push(
    "export function safeParseDocument({ actions, body, ...data }: Record<string, unknown>): SafeParseResult<ProteusDocument> {",
  );
  lines.push(
    "  const result = documentValidator.validate({ body: [], ...data });",
  );
  lines.push("  if (result.valid) {");
  lines.push(
    "    return { success: true, data: { actions, body, ...data } as ProteusDocument };",
  );
  lines.push("  }");
  lines.push("  return { success: false, error: result.errors };");
  lines.push("}");
  lines.push("");
  lines.push(
    "export function safeParseElement({ children, ...data }: Record<string, unknown>): SafeParseResult<ProteusElement> {",
  );
  lines.push("  const result = elementValidator.validate(data);");
  lines.push("  if (result.valid) {");
  lines.push(
    "    return { success: true, data: { children, ...data } as unknown as ProteusElement };",
  );
  lines.push("  }");
  lines.push("  return { success: false, error: result.errors };");
  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

/**
 * @returns {Record<string, Record<string, JSONSchema7Definition>>}
 */
function getPropTypeOverrides(additionalProperties = false) {
  return {
    Action: {
      onClick: {
        $ref: "#/definitions/ProteusEventHandler",
        description: "Action triggered when button is clicked",
      },
    },
    CancelAction: {
      placeholder: {
        description: "Placeholder text for the text input field",
        type: "string",
      },
    },
    Image: {
      alt: {
        description: "Alternative text for the image",
        type: "string",
      },
      src: {
        description: "The image source URL",
        type: "string",
      },
    },
    Map: {
      children: {
        description:
          "Template object to render for each item in the array. Value paths are relative to current item.",
        type: "object",
      },
      path: {
        description: "JSON pointer path to array (e.g., '/questions')",
        type: "string",
      },
    },
    Range: {
      marks: {
        description: "The marks to display on the range steps.",
        items: {
          anyOf: [
            { type: "number" },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
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
          ...(additionalProperties ? {} : { additionalProperties: false }),
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
      },
    },
    SelectContent: {
      children: {
        $ref: "#/definitions/ProteusNode",
      },
    },
    Show: {
      children: {
        $ref: "#/definitions/ProteusNode",
        description: "Content to show when condition is true",
      },
      when: {
        anyOf: [
          { $ref: "#/definitions/ProteusCondition" },
          {
            items: { $ref: "#/definitions/ProteusCondition" },
            type: "array",
          },
        ],
        description:
          "Single condition or array of conditions (AND logic). Each condition is an object with one operator key.",
      },
    },
    Value: {
      path: {
        description:
          "JSON pointer path to value (e.g., '/question', '/options/0/label')",
        type: "string",
      },
    },
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
      $ref: "#/definitions/ProteusNode",
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

const jsonSchema = generateJsonSchema(false);
const jsonOutputPath = path.join(process.cwd(), "proteus-document-spec.json");
fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonSchema, null, 2) + "\n");
console.log(`Generated: ${jsonOutputPath}`);

const jsonSchemaForRuntime = generateJsonSchema(true);
const jsonRuntimeOutputPath = path.join(
  process.cwd(),
  "packages/react/src/proteus-document/proteus-document-spec.json",
);
fs.writeFileSync(
  jsonRuntimeOutputPath,
  JSON.stringify(jsonSchemaForRuntime, null, 2) + "\n",
);
console.log(`Generated: ${jsonRuntimeOutputPath}`);

const typeScriptTypes = generateTypeScriptTypes();
const tsOutputPath = path.join(
  process.cwd(),
  "packages/react/src/proteus-document/schemas.ts",
);
fs.writeFileSync(tsOutputPath, typeScriptTypes);
console.log(`Generated: ${tsOutputPath}`);
