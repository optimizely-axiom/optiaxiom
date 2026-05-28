import { Validator } from "@cfworker/json-schema";
import { schema as proteusDocumentSpec } from "@optiaxiom/proteus/spec";

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

export const documentExamples = documentDef.examples ?? [];

export interface ValidationIssue {
  message: string;
  path: string;
}

// --- Property introspection from JSON Schema ---

interface PropInfo {
  description?: string;
  isCore: boolean;
  name: string;
  optional: boolean;
  options?: string[];
  type: "boolean" | "children" | "json" | "number" | "select" | "string";
}

// Per-element-type prop validators. cfworker short-circuits on the first
// failure, so to surface every invalid prop we validate one prop at a time
// against its own sub-schema.
type PropValidatorCache = Map<string, Validator>;

/**
 * Returns the first `examples` entry declared in the JSON Schema for the given
 * element type (or the Document shell). Used by the designer to seed newly
 * inserted nodes with a reasonable default shape.
 */
export function getExample(type: string): object | undefined {
  const def = type === "Document" ? documentDef : elementMap[type];
  if (!def) return undefined;
  return (def.examples as object[] | undefined)?.[0];
}

/**
 * Introspects the JSON Schema for an element type and returns a UI-friendly
 * description of each prop (kind, options, whether it's required, etc.) that
 * the PropertyInspector uses to render the right editor (select/string/number/
 * boolean/json/children).
 */
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

// --- Deep document validation ---

/**
 * Looks up a definition by its `#/definitions/Name` ref string. Returns
 * undefined if the target is missing from the schema.
 */
function resolveRef(ref: string): JSONSchema7 | undefined {
  const name = ref.replace("#/definitions/", "");
  return definitions[name] as JSONSchema7 | undefined;
}

/**
 * One-level $ref resolution: if the schema is a $ref, return the referenced
 * definition; otherwise return the schema as-is. Does not recurse — callers
 * that need transitive resolution must call this repeatedly.
 */
function resolveSchema(schema: JSONSchema7): JSONSchema7 {
  if (schema.$ref) {
    return resolveRef(schema.$ref) ?? schema;
  }
  return schema;
}

const propValidators = new Map<string, PropValidatorCache>();

/**
 * Returns a cfworker Validator scoped to a single property of an element
 * type. Validators are lazily built and memoized per (typeName, prop) pair so
 * repeated validation passes stay cheap. Returns undefined when the schema
 * does not declare the prop (in which case the schema treats it as an
 * unconstrained additional property and we skip validation).
 */
function getPropValidator(
  typeName: string,
  prop: string,
): undefined | Validator {
  const def = typeName === "Document" ? documentDef : elementMap[typeName];
  const propSchema = def?.properties?.[prop];
  if (!propSchema) return undefined;

  let cache = propValidators.get(typeName);
  if (!cache) {
    cache = new Map();
    propValidators.set(typeName, cache);
  }
  let v = cache.get(prop);
  if (!v) {
    v = new Validator(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...(propSchema as Record<string, unknown>), definitions } as any,
      "7",
    );
    cache.set(prop, v);
  }
  return v;
}

const knownTypes = new Set(Object.keys(elementMap));

/**
 * Returns true if the given prop schema (recursively through $ref/anyOf/oneOf/
 * items) could resolve to a ProteusNode or ProteusElement. Used to derive
 * which props on each element type hold child elements and therefore need to
 * be recursed into during validation. The `seen` set guards against cycles in
 * the schema.
 */
function schemaContainsElement(
  schema: unknown,
  seen = new Set<string>(),
): boolean {
  if (!schema || typeof schema !== "object") return false;
  const s = schema as Record<string, unknown>;
  const ref = s.$ref;
  if (typeof ref === "string") {
    if (
      ref === "#/definitions/ProteusNode" ||
      ref === "#/definitions/ProteusElement"
    ) {
      return true;
    }
    if (seen.has(ref)) return false;
    seen.add(ref);
    const target = resolveRef(ref);
    return schemaContainsElement(target, seen);
  }
  if (
    Array.isArray(s.anyOf) &&
    s.anyOf.some((sub) => schemaContainsElement(sub, seen))
  ) {
    return true;
  }
  if (
    Array.isArray(s.oneOf) &&
    s.oneOf.some((sub) => schemaContainsElement(sub, seen))
  ) {
    return true;
  }
  if (s.items && schemaContainsElement(s.items, seen)) return true;
  return false;
}

const childKeysCache = new Map<string, string[]>();

/**
 * Top-level entry point. Validates a Proteus document and returns a flat list
 * of `ValidationIssue`s with JSON pointer paths so callers (the designer's
 * Monaco editor markers) can pinpoint each problem in source.
 *
 * Validation strategy:
 * 1. Sanity-check that `doc` is an object with `$type: "Document"`.
 * 2. Shallow-validate every Document prop independently (see `validateProps`).
 * 3. Recurse into any prop whose schema can hold elements (`body`, `actions`,
 *    `subtitle`, `title`).
 */
export function validateDocument(
  doc: Record<string, unknown>,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (typeof doc !== "object" || doc === null) {
    return [{ message: "Document must be an object", path: "#" }];
  }
  if (doc.$type !== "Document") {
    issues.push({
      message: `Document.$type: expected "Document", got ${JSON.stringify(doc.$type)}`,
      path: "#/$type",
    });
  }

  validateProps("Document", doc, "#", issues);

  for (const key of getChildKeys("Document")) {
    if (key in doc) validateNode(doc[key], `#/${key}`, issues);
  }

  return issues;
}

/**
 * Turns a cfworker error list for a single prop into a human-readable message.
 * Prefers a short "expected one of: a, b, c" form when the schema is a const
 * union (the common case for our SprinkleProp_* enums); otherwise falls back
 * to the first concrete keyword error (`type`/`enum`/`pattern`/`required`).
 * Values are truncated to 60 chars to keep editor tooltips compact.
 */
function formatPropError(
  type: string,
  prop: string,
  value: unknown,
  errors: ReadonlyArray<{ error: string; keyword: string }>,
): string {
  let display: string;
  if (typeof value === "string" || typeof value === "number") {
    display = JSON.stringify(value);
  } else if (typeof value === "boolean" || value === null) {
    display = String(value);
  } else {
    const json = JSON.stringify(value);
    display = json.length > 60 ? json.slice(0, 57) + "…" : json;
  }

  // Collect const/enum allowed values for a friendlier message.
  const allowed = errors
    .filter((e) => e.keyword === "const")
    .map((e) => {
      const m = e.error.match(/"([^"]*)"/);
      return m ? m[1] : null;
    })
    .filter((s): s is string => !!s);

  if (allowed.length > 0) {
    const unique = Array.from(new Set(allowed));
    return `${type}.${prop}: ${display} is not a valid value (expected one of: ${unique
      .slice(0, 12)
      .map((v) => JSON.stringify(v))
      .join(", ")}${unique.length > 12 ? ", …" : ""})`;
  }

  const first = errors.find((e) =>
    ["enum", "pattern", "required", "type"].includes(e.keyword),
  );
  return `${type}.${prop}: ${display} is invalid${first ? ` (${first.error})` : ""}`;
}

/**
 * Returns the names of props on the given element type whose schema may hold
 * child Proteus elements. Result is memoized per type. Used both to drive
 * recursion in `validateNode` and to skip those props in `validateProps` (the
 * children are already validated when we recurse into them).
 */
function getChildKeys(typeName: string): string[] {
  let keys = childKeysCache.get(typeName);
  if (keys) return keys;
  const def = typeName === "Document" ? documentDef : elementMap[typeName];
  keys = [];
  for (const [prop, schema] of Object.entries(def?.properties ?? {})) {
    if (prop === "$type") continue;
    if (schemaContainsElement(schema)) keys.push(prop);
  }
  childKeysCache.set(typeName, keys);
  return keys;
}

/**
 * Type guard for "this value looks like a Proteus element" — a plain object
 * with a string `$type` discriminator. Strings, numbers, booleans, arrays
 * and nulls (all legal `ProteusNode`s but not elements) are rejected.
 */
function isElement(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof (value as Record<string, unknown>).$type === "string"
  );
}

/**
 * Recursively validates a `ProteusNode`: arrays of nodes, or a single element
 * (identified by `$type`). For each element it validates the props in place
 * via `validateProps` and then recurses into its element-bearing keys. Scalar
 * leaves and unknown shapes are ignored — they're either valid `ProteusNode`
 * primitives or are caught by the parent's per-prop validation.
 */
function validateNode(value: unknown, path: string, issues: ValidationIssue[]) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => validateNode(item, `${path}/${i}`, issues));
    return;
  }
  if (!isElement(value)) return;

  const type = String(value.$type);
  if (!knownTypes.has(type)) {
    issues.push({
      message: `Unknown element type "${type}"`,
      path: `${path}/$type`,
    });
    return;
  }

  validateProps(type, value, path, issues);

  // Recurse into element-bearing props of this specific element type.
  for (const key of getChildKeys(type)) {
    if (key in value) validateNode(value[key], `${path}/${key}`, issues);
  }
}

/**
 * Validates the props of a single element (or the Document shell) one at a
 * time, appending issues for any that fail. Validating prop-by-prop is what
 * lets us surface every invalid prop on an element: cfworker short-circuits
 * on the first failure when given the whole object, so a single bad prop
 * would otherwise mask its siblings. Element-bearing props are skipped here
 * since `validateNode` recurses into them separately.
 */
function validateProps(
  typeName: string,
  obj: Record<string, unknown>,
  path: string,
  issues: ValidationIssue[],
) {
  const def = typeName === "Document" ? documentDef : elementMap[typeName];
  if (!def) return;

  const childKeys = new Set(getChildKeys(typeName));

  // Required props missing?
  for (const required of def.required ?? []) {
    if (required === "$type") continue;
    if (!(required in obj)) {
      issues.push({
        message: `${typeName}: missing required property "${required}"`,
        path: `${path}/${required}`,
      });
    }
  }

  // Validate each present prop independently.
  for (const [prop, value] of Object.entries(obj)) {
    if (prop === "$type") continue;
    // Skip element-bearing keys; their contents are validated by recursion.
    if (childKeys.has(prop)) continue;

    const validator = getPropValidator(typeName, prop);
    if (!validator) continue; // unknown prop — schema allows additionalProperties

    const result = validator.validate(value);
    if (result.valid) continue;

    issues.push({
      message: formatPropError(typeName, prop, value, result.errors),
      path: `${path}/${prop}`,
    });
  }
}
