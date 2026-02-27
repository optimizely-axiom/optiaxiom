import type { ProteusDocument } from "../../../../packages/react/src/proteus-document/schemas";

import proteusDocumentSpec from "../../../../packages/react/src/proteus-document/proteus-document-spec.json";
import { safeParseDocument } from "../../../../packages/react/src/proteus-document/schemas";

export type ProteusDocumentProps = ProteusDocument;

type JSONSchema7 = {
  $ref?: string;
  [key: string]: unknown;
  anyOf?: JSONSchema7[];
  const?: unknown;
  description?: string;
  examples?: object[];
  properties?: Record<string, JSONSchema7>;
  required?: string[];
  type?: string;
};

const definitions = proteusDocumentSpec.definitions as unknown as Record<
  string,
  JSONSchema7
>;

// Build elementMap: component name → definition from ProteusElement's anyOf refs
const proteusElementDef = definitions["ProteusElement"] as JSONSchema7;
export const elementMap: Record<string, JSONSchema7> = Object.fromEntries(
  (proteusElementDef.anyOf ?? [])
    .map((entry) => entry.$ref?.replace("#/definitions/", ""))
    .filter((name): name is string => !!name)
    .map((name) => [name.replace(/^Proteus/, ""), definitions[name]]),
);

const documentDef = definitions["ProteusDocument"] as JSONSchema7;

// --- Helpers to extract document-level examples and safeParse ---

export const documentExamples: ProteusDocumentProps[] = (documentDef.examples ??
  []) as ProteusDocumentProps[];

export { safeParseDocument };

interface PropInfo {
  description?: string;
  isCore: boolean;
  name: string;
  optional: boolean;
  options?: string[];
  type: "boolean" | "children" | "json" | "number" | "select" | "string";
}

// --- Property introspection from JSON Schema ---

export function getExample(type: string): object | undefined {
  const def = type === "Document" ? documentDef : elementMap[type];
  if (!def) return undefined;
  return (def.examples as object[] | undefined)?.[0];
}

export function getPropsForType(type: string): PropInfo[] {
  const def = type === "Document" ? documentDef : elementMap[type];
  if (!def || !def.properties) return [];

  const requiredSet = new Set(def.required ?? []);
  const props: PropInfo[] = [];

  for (const [name, rawSchema] of Object.entries(def.properties)) {
    if (name === "$type") continue;

    const resolved = resolveSchema(rawSchema);
    const isSprinkle = rawSchema.$ref?.startsWith(
      "#/definitions/SprinkleProp_",
    );
    const isCore = !isSprinkle;
    const optional = !requiredSet.has(name);
    const description = resolved.description ?? rawSchema.description;

    if (name === "children") {
      props.push({ description, isCore, name, optional, type: "children" });
      continue;
    }

    // Check if it's a union of const values (select)
    if (resolved.anyOf) {
      const allConst = resolved.anyOf.every(
        (opt) => "const" in opt || opt.type === "string",
      );
      if (allConst) {
        const constOptions = resolved.anyOf
          .filter((opt) => "const" in opt)
          .map((opt) => String(opt.const));
        if (constOptions.length > 0) {
          props.push({
            description,
            isCore,
            name,
            optional,
            options: constOptions,
            type: "select",
          });
          continue;
        }
      }
    }

    // Single const value
    if ("const" in resolved) {
      props.push({
        description,
        isCore,
        name,
        optional,
        options: [String(resolved.const)],
        type: "select",
      });
      continue;
    }

    if (resolved.type === "string") {
      props.push({ description, isCore, name, optional, type: "string" });
      continue;
    }

    if (resolved.type === "number") {
      props.push({ description, isCore, name, optional, type: "number" });
      continue;
    }

    if (resolved.type === "boolean") {
      props.push({ description, isCore, name, optional, type: "boolean" });
      continue;
    }

    // Complex types → JSON editor
    props.push({ description, isCore, name, optional, type: "json" });
  }

  return props;
}

function resolveRef(ref: string): JSONSchema7 | undefined {
  const name = ref.replace("#/definitions/", "");
  return definitions[name] as JSONSchema7 | undefined;
}

function resolveSchema(schema: JSONSchema7): JSONSchema7 {
  if (schema.$ref) {
    return resolveRef(schema.$ref) ?? schema;
  }
  return schema;
}
