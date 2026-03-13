import { getDocs } from "@optiaxiom/shared";
import fs from "fs";
import { format } from "oxfmt";
import path from "path";
import { fileURLToPath } from "url";

/**
 * @typedef {import('@optiaxiom/shared').ComponentDoc} ComponentDoc
 * @typedef {import('@optiaxiom/shared').Prop} Prop
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
  Avatar: {
    allowedProps: [
      "children",
      "colorScheme",
      "fallback",
      "name",
      "size",
      "src",
    ],
  },
  Badge: {
    allowedProps: ["children", "intent"],
    example: { children: "Badge", intent: "success" },
  },
  CancelAction: {
    allowedProps: ["children", "placeholder"],
    example: { children: "Cancel" },
    extends: "Button",
  },
  Card: {
    allowedProps: ["children"],
    example: {
      children: [
        {
          $type: "CardHeader",
          children: "Card title",
          description: "Card description",
        },
      ],
    },
  },
  CardHeader: {
    allowedProps: ["addonAfter", "addonBefore", "children", "description"],
    example: { children: "Header", description: "Subtitle" },
  },
  CardLink: {
    allowedProps: ["children", "href"],
    example: { children: "Link text", href: "https://example.com" },
    extends: "Link",
  },
  Chart: {
    allowedProps: ["data", "series", "type", "xAxisKey"],
    example: {
      data: [
        { name: "Jan", revenue: 4000 },
        { name: "Feb", revenue: 3000 },
      ],
      series: [{ dataKey: "revenue", name: "Revenue" }],
      type: "bar",
      xAxisKey: "name",
    },
    extends: "Fragment",
  },
  Choice: {
    allowedProps: [
      "addonBefore",
      "children",
      "description",
      "onClick",
      "required",
      "value",
    ],
    example: {
      children: "Option 1",
      description: "Description of option 1",
      value: "option1",
    },
    extends: "Fragment",
  },
  ChoiceGroup: {
    allowedProps: ["children", "name"],
    example: {
      children: [
        {
          $type: "Choice",
          children: "Option 1",
          value: "option1",
        },
        {
          $type: "Choice",
          children: "Option 2",
          value: "option2",
        },
      ],
    },
    extends: "Fragment",
  },
  DataTable: {
    allowedProps: ["columns", "data"],
    example: {
      columns: [{ accessorKey: "name", header: "Name" }],
      data: [{ name: "Alice" }],
    },
    extends: "Fragment",
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
  IconCalendar: {
    allowedProps: [],
    extends: "Box",
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
      "required",
      "type",
    ],
    example: { name: "field_name", placeholder: "Enter value" },
  },
  Link: {
    allowedProps: ["children", "href"],
    example: { children: "Link text", href: "https://example.com" },
  },
  Map: {
    allowedProps: ["path", "children", "separator"],
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
    allowedProps: ["children", "name", "required", "options"],
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
    allowedProps: ["children", "lineClamp", "truncate"],
    example: { children: "New text" },
  },
  Textarea: {
    allowedProps: [
      "maxRows",
      "name",
      "placeholder",
      "resize",
      "required",
      "rows",
    ],
    example: { name: "field_name", placeholder: "Enter text" },
  },
  Time: {
    allowedProps: ["date", "showDate", "showTime"],
    example: { date: "2025-01-22T14:30:00Z" },
  },
  Value: {
    allowedProps: ["formatter", "path"],
    example: { path: "/field_name" },
    extends: "Fragment",
    requiredProps: ["path"],
  },
};

/** @returns {import('rollup').Plugin} */
export function generateSpecPlugin() {
  const schemaDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../src/schema/",
  );

  return {
    name: "proteus:generate-spec",

    async load(id) {
      if (!id.startsWith(schemaDir)) {
        return null;
      }

      // Generate the public schema (no additionalProperties)
      // or generate the runtime schema (with additionalProperties) and write to file
      const schema = generateSpec(path.basename(id) === "runtime-schema.json");
      const code = (
        await format(id, JSON.stringify(schema), { printWidth: 80 })
      ).code;
      fs.writeFileSync(id, code);

      return code;
    },
  };
}

/**
 * Main function to generate the complete Adaptive Proteus document spec
 * @param {boolean} [additionalProperties=false] - Whether to allow additional properties in the schema
 * @returns {JSONSchema7} Complete JSON Schema for Proteus documents
 */
function generateSpec(additionalProperties = false) {
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
        ProteusCondition: {
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
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                and: {
                  description:
                    "Logical AND - returns true if all conditions are true",
                  items: {
                    $ref: "#/definitions/ProteusCondition",
                  },
                  minItems: 1,
                  type: "array",
                },
              },
              required: ["and"],
              type: "object",
            },
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              properties: {
                or: {
                  description:
                    "Logical OR - returns true if any condition is true",
                  items: {
                    anyOf: [{ $ref: "#/definitions/ProteusCondition" }],
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
              $ref: "#/definitions/ProteusNode",
              description: "Actions available for this document",
            },
            appIcon: {
              description:
                "URL or data URI for the application icon (e.g., 'https://example.com/icon.png' or 'data:image/svg+xml,...'). Rendered as an <img> element.",
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
              $ref: "#/definitions/ProteusNode",
              description: "The main content of the document.",
            },
            subtitle: {
              $ref: "#/definitions/ProteusNode",
              description:
                "A brief description or tagline that provides additional context about the Proteus document's purpose.",
            },
            title: {
              $ref: "#/definitions/ProteusNode",
              description:
                "A concise heading that encapsulates the essence of the Proteus document's content or intended action.",
            },
          },
          required: ["$type", "body", "title"],
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
            {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              description:
                "Client-side component action - for downloading a URL",
              properties: {
                action: {
                  const: "download",
                  description: "The action type",
                  type: "string",
                },
                url: {
                  anyOf: [
                    { $ref: "#/definitions/ProteusValue" },
                    { type: "string" },
                  ],
                  description: "URL to download",
                },
              },
              required: ["action", "url"],
              type: "object",
            },
          ],
          description:
            "Handler for user interactions - a server-side tool call, client-side message, or client-side component action",
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
        ProteusZip: {
          ...(additionalProperties ? {} : { additionalProperties: false }),
          description:
            "Zips multiple parallel arrays into an array of objects. Each key in 'sources' becomes a property in the resulting row objects.",
          examples: [
            {
              $type: "Zip",
              sources: {
                date: { $type: "Value", path: "/upserts/0/i" },
                measure0: { $type: "Value", path: "/upserts/1/i" },
              },
            },
          ],
          properties: {
            $type: { const: "Zip" },
            sources: {
              ...(additionalProperties ? {} : { additionalProperties: false }),
              description:
                "Map of output property names to array sources. Each source should resolve to an array of the same length.",
              patternProperties: {
                ".*": {
                  anyOf: [
                    { $ref: "#/definitions/ProteusValue" },
                    { items: {}, type: "array" },
                  ],
                },
              },
              type: "object",
            },
          },
          required: ["$type", "sources"],
          type: "object",
        },
      },
    ),
    title: "Opal Proteus Document Specification",
  };
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
    Chart: {
      data: {
        anyOf: [
          {
            description: "Inline data records array",
            items: { type: "object" },
            type: "array",
          },
          { $ref: "#/definitions/ProteusValue" },
          { $ref: "#/definitions/ProteusZip" },
        ],
        description:
          "Chart data records, either inline, a ProteusValue reference, or a ProteusZip transformation",
      },
      series: {
        description: "Data series configuration",
        items: {
          ...(additionalProperties ? {} : { additionalProperties: false }),
          properties: {
            dataKey: {
              description: "Key in data records for this series",
              type: "string",
            },
            name: {
              description: "Display name for legend",
              type: "string",
            },
          },
          required: ["dataKey"],
          type: "object",
        },
        type: "array",
      },
      type: {
        anyOf: [{ const: "bar" }, { const: "line" }],
        description: "Chart type",
      },
      xAxisKey: {
        description: "Key in data records for x-axis labels",
        type: "string",
      },
    },
    Choice: {
      addonBefore: {
        $ref: "#/definitions/ProteusNode",
        description:
          "Content to display before the choice text (e.g., numbered badge)",
      },
      children: {
        $ref: "#/definitions/ProteusNode",
        description: "Title/label of the choice",
      },
      description: {
        $ref: "#/definitions/ProteusNode",
        description: "Secondary description text shown below the title",
      },
      onClick: {
        $ref: "#/definitions/ProteusEventHandler",
        description: "Action triggered when choice is selected",
      },
      required: {
        description: "Whether selecting this choice is required to proceed",
        type: "boolean",
      },
      value: {
        description: "Value associated with this choice",
        type: "string",
      },
    },
    ChoiceGroup: {
      children: {
        $ref: "#/definitions/ProteusNode",
        description: "Choice elements to render",
      },
      name: {
        description: "Data field name for the selected value",
        type: "string",
      },
    },
    DataTable: {
      columns: {
        description: "Column definitions",
        items: {
          ...(additionalProperties ? {} : { additionalProperties: false }),
          properties: {
            accessorKey: {
              description: "Key in data objects",
              type: "string",
            },
            format: {
              anyOf: [
                {
                  description: "Formatter name",
                  type: "string",
                },
                {
                  description: "Formatter with options",
                  properties: {
                    options: { type: "object" },
                    type: { type: "string" },
                  },
                  required: ["type"],
                  type: "object",
                },
              ],
              description:
                "Format to apply to cell values (e.g. 'Number', 'DateTime')",
            },
            header: {
              description: "Column header text",
              type: "string",
            },
            size: {
              description: "Column size",
              type: "number",
            },
          },
          required: ["accessorKey", "header"],
          type: "object",
        },
        type: "array",
      },
      data: {
        anyOf: [
          {
            description: "Inline data array",
            items: { type: "object" },
            type: "array",
          },
          { $ref: "#/definitions/ProteusValue" },
          { $ref: "#/definitions/ProteusZip" },
        ],
      },
    },
    Image: {
      alt: {
        anyOf: [{ $ref: "#/definitions/ProteusValue" }, { type: "string" }],
        description: "Alternative text for the image",
      },
      src: {
        anyOf: [{ $ref: "#/definitions/ProteusValue" }, { type: "string" }],
        description: "The image source URL",
      },
    },
    Map: {
      children: {
        $ref: "#/definitions/ProteusNode",
        description:
          "Template object to render for each item in the array. Value paths inside this template are relative to the current item (e.g., path='title' resolves to each item's 'title' field). Use a leading '/' to reference top-level data (e.g., path='/title' resolves to the root data's 'title').",
      },
      path: {
        description:
          "JSON pointer path to the source array in the data (e.g., '/results')",
        type: "string",
      },
      separator: {
        $ref: "#/definitions/ProteusNode",
        description:
          "Optional separator to render between items. Can be a string or a ProteusNode for more complex separators.",
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
      formatter: {
        anyOf: [
          {
            description:
              "Shorthand formatter name. 'DateTime' formats timestamps using Intl.DateTimeFormat (default: month short, day numeric). 'Number' formats numbers using Intl.NumberFormat.",
            enum: ["DateTime", "Number"],
            type: "string",
          },
          {
            ...(additionalProperties ? {} : { additionalProperties: false }),
            description:
              "Formatter with custom Intl options. 'type' selects the formatter, 'options' are passed to the Intl constructor.",
            properties: {
              options: {
                description:
                  "Options passed to the Intl formatter constructor (e.g., Intl.DateTimeFormatOptions or Intl.NumberFormatOptions)",
                type: "object",
              },
              type: {
                description: "Formatter type",
                enum: ["DateTime", "Number"],
                type: "string",
              },
            },
            required: ["type"],
            type: "object",
          },
        ],
        description:
          "Optional formatter to apply to the resolved value. Can be a string shorthand or an object with type and options for Intl formatters.",
      },
      path: {
        description:
          "Path to a value in the data. Absolute paths start with '/' and resolve from the root (e.g., '/title', '/options/0/label'). Inside a Map template, paths without a leading '/' are relative to the current item (e.g., 'title' resolves to each item's 'title' field).",
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
        anyOf: [
          { type: /** @type {const} */ ("number") },
          { $ref: "#/definitions/ProteusValue" },
        ],
        description: description,
      };
    } else if (
      type.raw === "string" ||
      type.raw === "string | Date" ||
      type.raw === "string | number | readonly string[]" // Handle value prop for inputs
    ) {
      return {
        anyOf: [
          { type: /** @type {const} */ ("string") },
          { $ref: "#/definitions/ProteusValue" },
        ],
        description: description,
      };
    } else if (type.raw === "boolean") {
      return {
        anyOf: [
          { type: /** @type {const} */ ("boolean") },
          { $ref: "#/definitions/ProteusValue" },
        ],
        description: description,
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
        { $ref: "#/definitions/ProteusValue" },
      ],
      description: description,
    };
  }

  if (type.name === "string") {
    return {
      anyOf: [
        { type: /** @type {const} */ ("string") },
        { $ref: "#/definitions/ProteusValue" },
      ],
      description: description,
    };
  }

  if (["boolean", "number"].includes(type.name)) {
    return {
      anyOf: [
        { type: /** @type {"boolean" | "number"} */ (type.name) },
        { $ref: "#/definitions/ProteusValue" },
      ],
      description: description,
    };
  }

  throw new Error(
    `Unsupported prop type: ${name} with type ${type.name || type.raw}`,
  );
}
