import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {import('@optiaxiom/shared').Field} Field
 * @typedef {import('@optiaxiom/shared').Prop} PropItem
 * @typedef {import('@optiaxiom/shared').Shape} Shape
 * @typedef {import('../src/types.js').Example} Example
 * @typedef {import('../src/types.js').ExampleFile} ExampleFile
 * @typedef {import('../src/types.js').PropDefinition} PropDefinition
 * @typedef {import('../src/types.js').TypeSchema} TypeSchema
 * @typedef {import('../src/types.js').TypeSchemaType} TypeSchemaType
 */

/**
 * Extract Axiom component names imported from @optiaxiom/react across all files in an example.
 * @param {ExampleFile[]} code - The example's source files
 * @returns {string[]}
 */
export function extractAxiomImports(code) {
  /** @type {Set<string>} */
  const components = new Set();
  const importPattern =
    /import\s*\{([^}]+)\}\s*from\s*["']@optiaxiom\/react(?:\/[^"']+)?["']/g;

  for (const { content } of code) {
    let match;
    while ((match = importPattern.exec(content)) !== null) {
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

/**
 * Map each `<Demo component="x/y" />` on a docs page to the heading it sits
 * under and the prose that introduces it. The heading is the path below the
 * page's `##` section (`Pagination > Client side`), or the section itself for
 * a demo directly under it. When several demos share a heading, each gets the
 * prose since the previous demo, falling back to the heading's own intro when
 * there is none.
 *
 * @param {string} mdx - Docs page source
 * @returns {Map<string, { description?: string; heading: string }>}
 */
export function parseDemoContext(mdx) {
  /** @type {Map<string, { description?: string; heading: string }>} */
  const context = new Map();
  const tokens = mdx.matchAll(
    /^(#{2,6})\s+(.+)$|<Demo\b[\s\S]*?\bcomponent="([^"]+)"[\s\S]*?\/>|^[ \t]*```[\s\S]*?^[ \t]*```/gm,
  );

  /** @type {string[]} */
  const headings = [];
  let intro = "";
  let demosUnderHeading = 0;
  let last = 0;
  // Prose since the last heading or demo; code fences are skipped, not
  // boundaries, so text on either side of a fence stays together.
  let buffer = "";
  for (const match of tokens) {
    buffer += mdx.slice(last, match.index) + "\n\n";
    last = match.index + match[0].length;
    if (!match[1] && !match[3]) {
      continue;
    }
    const prose = cleanProse(buffer);
    buffer = "";

    if (match[1]) {
      const level = match[1].length;
      headings.length = level - 1;
      headings[level - 2] = cleanProse(match[2] ?? "");
      intro = "";
      demosUnderHeading = 0;
    } else if (match[3]) {
      if (demosUnderHeading++ === 0) {
        intro = prose;
      }
      const description = prose || intro;
      const heading =
        headings.slice(1).filter(Boolean).join(" > ") || headings[0];
      if (heading && !context.has(match[3])) {
        context.set(match[3], {
          ...(description && { description }),
          heading,
        });
      }
    }
  }

  return context;
}

/**
 * Parse demo files from apps/docs/demos/{component-name}/ folders
 * @param {string} componentName - The component name (will be converted to kebab-case)
 * @returns {Promise<Example[]>}
 */
export async function parseDemosFromFiles(componentName) {
  const demosPath = join(
    __dirname,
    "../../../apps/docs/demos",
    toKebabCase(componentName),
  );

  try {
    // Sort so generated output is deterministic across platforms (readdir
    // order is filesystem-dependent).
    const folders = (await readdir(demosPath, { withFileTypes: true })).sort(
      (a, b) => a.name.localeCompare(b.name),
    );
    /** @type {Example[]} */
    const examples = [];

    for (const folder of folders) {
      if (!folder.isDirectory()) {
        continue;
      }

      const folderPath = join(demosPath, folder.name);

      try {
        const files = (await readdir(folderPath, { withFileTypes: true }))
          .filter(
            (file) =>
              file.isFile() &&
              (file.name.endsWith(".tsx") ||
                file.name.endsWith(".ts") ||
                file.name.endsWith(".css")),
          )
          // App.tsx first, then alphabetical — fixes the display order.
          .sort((a, b) => {
            if (a.name === "App.tsx") return -1;
            if (b.name === "App.tsx") return 1;
            return a.name.localeCompare(b.name);
          });

        /** @type {ExampleFile[]} */
        const code = [];
        for (const file of files) {
          code.push({
            content: await readFile(join(folderPath, file.name), "utf-8"),
            filename: file.name,
          });
        }

        // Only add if we found at least one file
        if (code.length > 0) {
          examples.push({
            code,
            components: extractAxiomImports(code),
            title: folder.name,
          });
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
 * Describe a docgen prop, or a field of an object-typed prop, with JSON Schema
 * keywords.
 *
 * @param {Field} prop
 * @returns {PropDefinition}
 */
export function parsePropDefinition(prop) {
  const responsive = (prop.type.raw || prop.type.name || "").startsWith(
    "ConditionalStyleWithResponsiveArray<",
  );

  return {
    ...(prop.description && { description: prop.description }),
    ...(prop.defaultValue && { default: prop.defaultValue.value }),
    ...(prop.shape
      ? parseShape(prop.shape)
      : responsive
        ? parseResponsiveSchema(prop.type)
        : parseTypeSchema(prop.type)),
    ...(responsive && { responsive: true }),
  };
}

/**
 * Describe a docgen type with JSON Schema keywords. Whatever JSON Schema
 * can't express (functions, `ReactNode`, generics, unions mixing kinds) keeps
 * its TypeScript type string in `tsType`.
 *
 * @param {PropItem["type"]} type
 * @returns {TypeSchema}
 */
export function parseTypeSchema(type) {
  const raw = type.raw || type.name || "unknown";
  // docgen lists union members in `value` only for unions (`name: "enum"`).
  return parseUnionSchema(
    type.name === "enum" && Array.isArray(type.value)
      ? /** @type {Array<{ value: string }>} */ (type.value).map(
          (member) => member.value,
        )
      : [raw],
    raw,
  );
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
 * Reduce a stretch of MDX prose to plain paragraphs: drop imports, JSX tags
 * (keeping their text) and link targets. Inline code is kept verbatim so
 * `<ButtonGroup />` survives, and list items keep their own lines.
 *
 * @param {string} value
 */
function cleanProse(value) {
  return value
    .replace(/^import .+$/gm, "")
    .split(/(`[^`\n]*`)/)
    .map((segment, index) =>
      index % 2
        ? segment
        : segment
            .replace(/<\/?[A-Za-z][^>]*>/g, "")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
    )
    .join("")
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .split("\n")
        .map((line) => line.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .reduce(
          (text, line) =>
            !text
              ? line
              : `${text}${/^([-*]|\d+\.) /.test(line) ? "\n" : " "}${line}`,
          "",
        ),
    )
    .filter(Boolean)
    .join("\n\n");
}

/**
 * @param {TypeSchema} a
 * @param {TypeSchema} b
 */
function compare(a, b) {
  return JSON.stringify(a).localeCompare(JSON.stringify(b));
}

/**
 * Call `callback` with the index of each character of a type string that sits
 * outside brackets and quoted literals, so `"(" | ")"` or
 * `{ fn: () => void }` don't read as structure.
 *
 * @param {string} value
 * @param {(index: number) => boolean | void} callback - return `true` to stop
 */
function forEachTopLevel(value, callback) {
  let depth = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value[i] ?? "";
    if (char === '"' || char === "'" || char === "`") {
      // Skip to the closing quote, past escaped ones.
      for (i++; i < value.length && value[i] !== char; i++) {
        if (value[i] === "\\") {
          i++;
        }
      }
    } else if ("([{<".includes(char)) {
      depth++;
    } else if (")]}".includes(char) || (char === ">" && value[i - 1] !== "=")) {
      depth--;
    } else if (depth === 0 && callback(i)) {
      return;
    }
  }
}

/**
 * @param {TypeSchema} a
 * @param {TypeSchema} b
 */
function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * @typedef {{ kind: "const"; value: boolean | number | string }
 *   | { kind: "scalar"; type: TypeSchemaType }
 *   | { kind: "array"; items?: TypeSchema }
 *   | { kind: "object"; schema: TypeSchema }
 *   | { kind: "other" }} Member
 */

/**
 * Whether a type string is a function type, i.e. has a `=>` outside any
 * brackets: `() => string[]` is, `{ fn: () => void }[]` isn't.
 *
 * @param {string} value
 */
function isFunction(value) {
  let found = false;
  forEachTopLevel(value, (i) => {
    found = value[i] === "=" && value[i + 1] === ">";
    return found;
  });
  return found;
}

/**
 * Describe a union from its classified members: literals as one `enum`,
 * primitives as one `type`, and arrays and objects as further `anyOf`
 * branches. A member JSON Schema can't express keeps the union's TypeScript
 * type `raw`.
 *
 * @param {Member[]} members
 * @param {string} [raw] Omitted for a generator shape, whose members all
 *   have a JSON Schema form
 * @returns {TypeSchema}
 */
function mergeMembers(members, raw) {
  /** @type {Array<boolean | number | string>} */
  const consts = [];
  /** @type {TypeSchemaType[]} */
  const scalars = [];
  /** @type {TypeSchema[]} */
  const arrays = [];
  /** @type {TypeSchema[]} */
  const objects = [];
  for (const member of members) {
    if (member.kind === "const") {
      if (!consts.includes(member.value)) {
        consts.push(member.value);
      }
    } else if (member.kind === "scalar") {
      if (!scalars.includes(member.type)) {
        scalars.push(member.type);
      }
    } else if (member.kind === "object") {
      if (!objects.some((other) => isEqual(other, member.schema))) {
        objects.push(member.schema);
      }
    } else if (member.kind === "array" && member.items) {
      const array = {
        items: member.items,
        type: /** @type {const} */ ("array"),
      };
      // `readonly string[] | string[]` is one array type written twice.
      if (!arrays.some((other) => isEqual(other, array))) {
        arrays.push(array);
      }
    } else {
      if (raw === undefined) {
        throw new Error("A shape member has no JSON Schema form");
      }
      return {
        ...(members.every((other) => other.kind === "array") && {
          type: /** @type {const} */ ("array"),
        }),
        tsType: raw,
      };
    }
  }

  // docgen spells `boolean` as `false | true`.
  if (consts.length === 2 && consts.includes(false) && consts.includes(true)) {
    consts.length = 0;
    if (!scalars.includes("boolean")) {
      scalars.unshift("boolean");
    }
  }

  /** @type {TypeSchema[]} */
  const schemas = [
    ...(consts.length > 0 ? [{ enum: consts }] : []),
    ...(scalars.length > 0
      ? [{ type: scalars.length === 1 ? scalars[0] : scalars }]
      : []),
    // TypeScript doesn't keep union members in a stable order.
    ...arrays.sort(compare),
    ...objects.sort(compare),
  ];
  // e.g. `"text" | (string & {})`, or `"alt" | "ctrl" | ("alt" | "ctrl")[]`
  return schemas.length === 1 && schemas[0] ? schemas[0] : { anyOf: schemas };
}

/**
 * The value of a JSON literal type string (`"sm"`, `0`, `false`), else
 * `undefined`.
 *
 * @param {string} value
 * @returns {boolean | number | string | undefined}
 */
function parseLiteral(value) {
  try {
    const literal = JSON.parse(value);
    if (
      typeof literal === "boolean" ||
      typeof literal === "number" ||
      typeof literal === "string"
    ) {
      return literal;
    }
  } catch {
    // Not a literal
  }
  return undefined;
}

/**
 * Classify one union member's type string.
 *
 * @param {string} value
 * @returns {Member}
 */
function parseMember(value) {
  if (value === "null") {
    return { kind: "scalar", type: "null" };
  }
  const literal = parseLiteral(value);
  if (literal !== undefined) {
    return { kind: "const", value: literal };
  }

  // A type intersected with a literal accepts at most that literal, e.g. a
  // recipe variant narrowing a sprinkle: `{ base?: "xs" | … } & "xs"`.
  const intersected = splitTopLevel(value, "&").map(parseLiteral);
  const intersectedLiteral = intersected.find((part) => part !== undefined);
  if (
    intersectedLiteral !== undefined &&
    intersected.every(
      (part) => part === undefined || part === intersectedLiteral,
    )
  ) {
    return { kind: "const", value: intersectedLiteral };
  }

  // `string & {}` keeps a literal union open to any string.
  const scalar = value === "string & {}" ? "string" : value;
  if (scalar === "boolean" || scalar === "number" || scalar === "string") {
    return { kind: "scalar", type: scalar };
  }

  if (value.endsWith("[]") && !isFunction(value)) {
    const element = value.replace(/^readonly /, "").slice(0, -2);
    const inner = /^\(.*\)$/.test(element) ? element.slice(1, -1) : element;
    const items = parseUnionSchema(splitTopLevel(inner, "|"), inner);
    return items.tsType ? { kind: "array" } : { items, kind: "array" };
  }
  return { kind: "other" };
}

/**
 * Responsive style props (`p`, `gap`, …) are typed as a vanilla-extract
 * conditional; their literal values are the members without a description.
 *
 * @param {PropItem["type"]} type
 * @returns {TypeSchema}
 */
function parseResponsiveSchema(type) {
  const values = /** @type {Array<{ value: string; description?: string }>} */ (
    type.value ?? []
  )
    .filter((member) => !("description" in member))
    .map((member) => member.value);

  return values.length > 0
    ? parseUnionSchema(values, type.raw || type.name)
    : { tsType: type.raw || type.name };
}

/**
 * Describe a type from the structure the docs generator read off it.
 *
 * @param {Shape} shape
 * @returns {TypeSchema}
 */
function parseShape(shape) {
  if ("anyOf" in shape) {
    return mergeMembers(shape.anyOf.map(parseShapeMember));
  }
  if ("const" in shape) {
    return { enum: [shape.const] };
  }
  if ("type" in shape) {
    return { type: shape.type };
  }
  if ("items" in shape) {
    return { items: parseShape(shape.items), type: "array" };
  }
  if ("values" in shape) {
    return { additionalProperties: parseShape(shape.values), type: "object" };
  }
  const fields = Object.entries(shape.fields);
  const required = fields.flatMap(([name, field]) =>
    field.required ? [name] : [],
  );
  return {
    properties: Object.fromEntries(
      fields.map(([name, field]) => [name, parsePropDefinition(field)]),
    ),
    ...(required.length > 0 && { required }),
    ...(shape.name && { title: shape.name }),
    type: "object",
  };
}

/**
 * Classify one union member's structure.
 *
 * @param {Shape} shape
 * @returns {Member}
 */
function parseShapeMember(shape) {
  if ("const" in shape) {
    return { kind: "const", value: shape.const };
  }
  if ("type" in shape) {
    return { kind: "scalar", type: shape.type };
  }
  if ("items" in shape) {
    return { items: parseShape(shape.items), kind: "array" };
  }
  return { kind: "object", schema: parseShape(shape) };
}

/**
 * Describe a union from its members' type strings; `raw` is the whole type,
 * kept as `tsType` when a member has no JSON Schema form.
 *
 * @param {string[]} values
 * @param {string} raw
 * @returns {TypeSchema}
 */
function parseUnionSchema(values, raw) {
  return mergeMembers(values.map(parseMember), raw);
}

/**
 * Split a type string on a `|` or `&` operator, skipping any inside brackets
 * or quoted literals.
 *
 * @param {string} value
 * @param {"&" | "|"} operator
 */
function splitTopLevel(value, operator) {
  /** @type {string[]} */
  const members = [];
  let start = 0;
  forEachTopLevel(value, (i) => {
    if (value[i] === operator) {
      members.push(value.slice(start, i).trim());
      start = i + 1;
    }
  });
  members.push(value.slice(start).trim());
  return members;
}
