import { tokens } from "@optiaxiom/globals";
import { getDocs } from "@optiaxiom/shared";
import { transform } from "esbuild";
import { readdir, readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  extractAxiomImports,
  parseDemosFromFiles,
  parseLightDark,
  parsePropDefinition,
  remToPx,
  toKebabCase,
} from "./parsers.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {import('../src/types.js').ComponentInfo} ComponentInfo
 * @typedef {import('../src/types.js').DeprecationInfo} DeprecationInfo
 * @typedef {import('../src/types.js').DesignTokens} DesignTokens
 * @typedef {import('../src/types.js').Guide} Guide
 * @typedef {import('../src/types.js').IconInfo} IconInfo
 * @typedef {import('../src/types.js').TestInfo} TestInfo
 */

/**
 * @returns {Promise<Record<string, ComponentInfo>>}
 */
export async function generateComponents() {
  const docs = getDocs();
  /** @type {Record<string, ComponentInfo>} */
  const components = {};

  // First pass: create all component metadata
  for (const doc of docs) {
    const name = doc.displayName.replace("@optiaxiom/react/", "");
    const group =
      "group" in doc.tags && typeof doc.tags.group === "string"
        ? doc.tags.group
        : undefined;

    if ((group || name) === "Listbox") {
      continue;
    }

    // Exclude *Root components and their sub-components — these are advanced
    // decomposed APIs that should be used manually rather than with AI.
    // The convenience wrappers (Input, Button, Tooltip, etc.) are preferred.
    if (name.endsWith("Root") || (group && group.endsWith("Root"))) {
      continue;
    }

    const description =
      doc.description || `${name} component from Axiom Design System`;

    /** @type {ComponentInfo} */
    const component = {
      description,
      import: `import { ${name} } from '${
        "experimental" in doc.tags
          ? `@optiaxiom/react/unstable`
          : `@optiaxiom/react`
      }';`,
      name,
      props: Object.fromEntries(
        doc.props.map((prop) => [prop.name, parsePropDefinition(prop)]),
      ),
    };

    if ("since" in doc.tags && typeof doc.tags.since === "string") {
      component.since = doc.tags.since;
    }
    if (group) {
      component.group = group;
    }
    if ("category" in doc.tags && typeof doc.tags.category === "string") {
      component.category = doc.tags.category
        .split("\n")
        .map((c) => c.trim())
        .filter(Boolean);
    }
    if ("deprecated" in doc.tags && typeof doc.tags.deprecated === "string") {
      component.deprecated = parseDeprecation(doc.tags.deprecated);
    }

    components[component.name] = component;
  }

  // Second pass: build component groups and set docsUrl
  /** @type {Map<string, string[]>} */
  const componentsByGroup = new Map();

  // Collect all components in each group
  for (const component of Object.values(components)) {
    if (component.group) {
      const groupedComponents = componentsByGroup.get(component.group) ?? [];
      groupedComponents.push(component.name);
      componentsByGroup.set(component.group, groupedComponents);
    }
  }

  // Update components with group information, docsUrl, and inherit "since" and "category" from parent
  for (const component of Object.values(components)) {
    if (component.group) {
      // If this is the primary component (name matches group), add components array
      if (component.name === component.group) {
        component.components = componentsByGroup.get(component.group) || [];
      } else {
        // This is a sub-component, inherit from parent
        const parentComponent = components[component.group];
        if (parentComponent) {
          // Inherit "since" if not defined
          if (parentComponent.since && !component.since) {
            component.since = parentComponent.since;
          }
          // Inherit "category" if not defined
          if (parentComponent.category && !component.category) {
            component.category = parentComponent.category;
          }
        }
      }

      // Set docsUrl to point to the group component
      component.docsUrl = `https://optimizely-axiom.github.io/optiaxiom/components/${toKebabCase(component.group)}`;
    } else {
      // No group, use own name for docsUrl
      component.docsUrl = `https://optimizely-axiom.github.io/optiaxiom/components/${toKebabCase(component.name)}`;
    }
  }

  // Third pass: Parse all component demos in parallel
  await Promise.all(
    Object.values(components)
      .filter(
        // Only include examples for primary components (no group, or name matches group)
        (component) => !component.group || component.name === component.group,
      )
      .map(async (component) => {
        component.examples = await parseDemosFromFiles(
          // Special case: ToastProvider demos are in "toast" folder
          component.name === "ToastProvider" ? "Toast" : component.name,
        );
      }),
  );

  return components;
}

// Guides that exist as docs pages but should not be surfaced via the MCP.
// `mcp` is self-referential — it documents this very server's tools, which an
// AI client already has — so fetching it adds noise rather than capability.
const EXCLUDED_GUIDES = new Set(["mcp", "proteus", "proteus-designer"]);

// Styling-section pages (apps/docs/app/(docs)/styling/<name>/) to surface as
// MCP guides. Kept explicit (not the whole section) so we only expose pages
// with proven agent value. Add a slug here to surface another styling page.
const STYLING_GUIDES = new Set([
  "colors",
  "design-tokens",
  "responsive-styles",
]);

/**
 * @returns {Promise<Record<string, Guide>>}
 */
export async function generateGuides() {
  const docsAppDir = join(__dirname, "..", "..", "..", "apps", "docs", "app");
  const guidesDir = join(docsAppDir, "(docs)", "guides");
  const stylingDir = join(docsAppDir, "(docs)", "styling");

  // The docs nav manifest is the source of truth for which guides exist and
  // their titles. Entries are tagged with the section they came from.
  const entries = await parseGuidesFromMeta(
    join(docsAppDir, "_meta.global.tsx"),
  );

  /** @type {Record<string, Guide>} */
  const result = {};

  for (const { name, section, title } of entries) {
    // Only `design-tokens` (and any future allowlisted slug) is surfaced from
    // the styling section; everything else there stays out of the MCP.
    if (section === "styling" && !STYLING_GUIDES.has(name)) {
      continue;
    }

    // In the guides section, `index` is the landing page
    // (apps/.../guides/page.mdx) and is keyed as `getting-started`; every other
    // key maps to its own folder's page.mdx.
    const baseDir = section === "styling" ? stylingDir : guidesDir;
    const isGuidesIndex = section === "guides" && name === "index";
    const path = isGuidesIndex
      ? join(baseDir, "page.mdx")
      : join(baseDir, name, "page.mdx");
    const key = isGuidesIndex ? "getting-started" : name;

    const content = await readFile(path, "utf-8").catch(() => null);
    if (content === null) {
      continue;
    }

    result[key] = {
      content: await stripMDXComponents(content),
      name: key,
      title,
    };
  }

  return result;
}

/**
 * @returns {Promise<Record<string, IconInfo>>}
 */
export async function generateIcons() {
  const tagsPath = join(__dirname, "..", "..", "icons", "tags.json");
  /** @type {Record<string, string[]>} */
  const tags = JSON.parse(await readFile(tagsPath, "utf-8"));

  return Object.fromEntries(
    Object.entries(tags)
      .filter(([key]) => !key.startsWith("//"))
      .map(([name, keywords]) => [
        name,
        {
          import: `import { ${name} } from '@optiaxiom/icons';`,
          keywords,
          name,
        },
      ]),
  );
}

/**
 * Discover vetted `.spec.tsx` test files under packages/react/src and bundle
 * their source as reference patterns for AI-generated tests.
 *
 * The component name is derived from the spec filename (e.g. `Alert.spec.tsx` ->
 * `Alert`), so no per-component configuration is needed — drop a spec next to a
 * component and it shows up here automatically.
 *
 * @returns {Promise<Record<string, TestInfo>>}
 */
export async function generateTests() {
  const srcDir = join(__dirname, "..", "..", "..", "packages", "react", "src");

  /** @type {Record<string, TestInfo>} */
  const tests = {};

  /** @param {string} dir */
  async function walk(dir) {
    // Sort for deterministic output (readdir order is filesystem-dependent).
    const entries = (await readdir(dir, { withFileTypes: true })).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".spec.tsx")) {
        const name = basename(entry.name, ".spec.tsx");
        const source = await readFile(fullPath, "utf-8");
        tests[name] = {
          components: extractTestComponents(name, source),
          name,
          source,
        };
      }
    }
  }

  await walk(srcDir);

  return tests;
}

/**
 * @returns {Promise<DesignTokens>}
 */
export async function generateTokens() {
  return {
    borderRadius: Object.fromEntries(
      Object.entries(tokens.borderRadius).map(([token, value]) => [
        token,
        token === "full" ? value : remToPx(value),
      ]),
    ),
    boxShadow: tokens.boxShadow,
    colors: Object.fromEntries(
      Object.entries(tokens.colors)
        .map(([token, value]) => {
          const hex = parseLightDark(value);
          return hex ? [token, hex] : null;
        })
        .filter((entry) => entry !== null),
    ),
    duration: tokens.duration,
    fontFamily: tokens.fontFamily,
    fontSize: Object.fromEntries(
      Object.entries(tokens.fontSize).map(([token, value]) => {
        return [
          token,
          {
            fontSize: remToPx(value.fontSize),
            lineHeight: remToPx(value.lineHeight),
          },
        ];
      }),
    ),
    maxSize: Object.fromEntries(
      Object.entries(tokens.maxSize).map(([token, value]) => [
        token,
        remToPx(value),
      ]),
    ),
    size: Object.fromEntries(
      Object.entries(tokens.size).map(([token, value]) => [
        token,
        remToPx(value),
      ]),
    ),
    zIndex: tokens.zIndex,
  };
}

/**
 * Determine which Axiom components a spec file exercises. Specs import the
 * component under test via a relative path (e.g. `./Alert`), so that is always
 * included; any `@optiaxiom/react` imports are merged in for specs that compose
 * multiple components.
 *
 * @param {string} name - Component name derived from the spec filename
 * @param {string} source - Spec file source
 * @returns {string[]}
 */
function extractTestComponents(name, source) {
  const components = new Set([name, ...extractAxiomImports({ source })]);
  return [...components].sort();
}

/**
 * Infer a fenced-code-block language from a demo file name.
 * @param {string} filename
 * @returns {string}
 */
function langForFile(filename) {
  if (filename.endsWith(".css")) {
    return "css";
  }
  if (filename.endsWith(".tsx")) {
    return "tsx";
  }
  return "ts";
}

/**
 * Parse `@deprecated` tag following the pattern:
 *
 * @example
 * "since X.X.X use {@link ComponentName} instead"
 *
 * @param {string} deprecatedTag - The raw deprecated tag value
 * @returns {DeprecationInfo}
 */
function parseDeprecation(deprecatedTag) {
  // Pattern: "since X.X.X use {@link ComponentName} instead"
  const sinceMatch = deprecatedTag.match(/since\s+([\d.]+)/);
  const replacementMatch = deprecatedTag.match(/\{@link\s+(\w+)\s*\}/);

  return {
    replacement: replacementMatch ? replacementMatch[1] : undefined,
    since: sinceMatch ? sinceMatch[1] : deprecatedTag,
  };
}

/**
 * Read the entries from the docs nav manifest (`_meta.global.tsx`) for both the
 * `guides` and `styling` sections, tagging each with its `section`.
 *
 * Skips separators, hidden pages, and {@link EXCLUDED_GUIDES}; throws on a
 * non-string title (it can't be surfaced via the MCP).
 *
 * @param {string} metaPath
 * @returns {Promise<Array<{ name: string, section: "guides" | "styling", title: string }>>}
 */
async function parseGuidesFromMeta(metaPath) {
  const source = await readFile(metaPath, "utf-8");

  // The manifest is TSX importing React/@optiaxiom/react. Transform it and route
  // JSX through a sentinel factory so JSX titles become non-strings instead of
  // executing real components.
  const { code } = await transform(source, {
    format: "esm",
    jsx: "transform",
    jsxFactory: "__jsx",
    jsxFragment: "__jsx",
    loader: "tsx",
  });

  // Strip imports and stub their bindings (only used inside the neutralized JSX)
  // so the module evaluates to a plain object with no runtime deps.
  const stub = `const __jsx = () => ({ __jsx: true }); const Badge = __jsx, Group = __jsx;`;
  const stripped = code.replace(/^\s*import\s.+$/gm, "");
  const mod = await import(
    "data:text/javascript," + encodeURIComponent(`${stub}\n${stripped}`)
  );

  /** @type {Array<{ name: string, section: "guides" | "styling", title: string }>} */
  const entries = [];

  for (const section of /** @type {const} */ (["guides", "styling"])) {
    /** @type {Record<string, unknown>} */
    const items = mod.default?.[section]?.items ?? {};

    for (const [name, value] of Object.entries(items)) {
      if (name.startsWith("--") || EXCLUDED_GUIDES.has(name)) {
        continue;
      }

      if (typeof value === "object" && value !== null) {
        const entry = /** @type {Record<string, unknown>} */ (value);
        if (entry.type === "separator" || entry.display === "hidden") {
          continue;
        }
        if (typeof entry.title !== "string") {
          throw new Error(
            `Guide "${name}" in ${metaPath} has a non-string title; give it a plain-text title or add it to EXCLUDED_GUIDES.`,
          );
        }
        entries.push({ name, section, title: entry.title });
      } else if (typeof value === "string") {
        entries.push({ name, section, title: value });
      } else {
        throw new Error(
          `Guide "${name}" in ${metaPath} has a non-string title; give it a plain-text title or add it to EXCLUDED_GUIDES.`,
        );
      }
    }
  }

  return entries;
}

/**
 * Resolve a `<Demo component="x/y" />` reference to inlined fenced code blocks.
 *
 * The `component` attribute is `<demoComponent>/<exampleTitle>` (e.g.
 * `styles/prop-usage`), matching a subfolder under `apps/docs/demos/`. We reuse
 * {@link parseDemosFromFiles} (which returns one entry per example subfolder) and
 * pick the matching example by title.
 *
 * Single-file demos render as a plain fence; multi-file demos render one fence
 * per file tagged with `filename="..."`, matching the docs' own convention.
 *
 * @param {string} ref - The `component` attribute value, e.g. `styles/prop-usage`.
 * @returns {Promise<string>}
 */
async function resolveDemoRef(ref) {
  const slash = ref.lastIndexOf("/");
  if (slash === -1) {
    return "";
  }
  const demoComponent = ref.slice(0, slash);
  const exampleTitle = ref.slice(slash + 1);

  const examples = await parseDemosFromFiles(demoComponent);
  const example = examples.find((e) => e.title === exampleTitle);
  if (!example) {
    return "";
  }

  // Deterministic order: App.tsx first, then the rest alphabetically.
  const filenames = Object.keys(example.code).sort((a, b) => {
    if (a === "App.tsx") {
      return -1;
    }
    if (b === "App.tsx") {
      return 1;
    }
    return a.localeCompare(b);
  });

  const single = filenames.length === 1;
  return filenames
    .map((filename) => {
      const meta = single ? "" : ` filename="${filename}"`;
      return `\`\`\`${langForFile(filename)}${meta}\n${example.code[filename].trim()}\n\`\`\``;
    })
    .join("\n\n");
}

/**
 * Clean MDX content for better AI consumption.
 *
 * Stripping is applied only to prose *outside* fenced code blocks, so example
 * code (including its `import` lines) survives intact and stays copy-pasteable.
 *
 * @param {string} content
 * @returns {Promise<string>}
 */
async function stripMDXComponents(content) {
  // Split on fenced code blocks, keeping the fences. Even indices are prose,
  // odd indices are code fences (left untouched).
  content = (
    await Promise.all(
      content
        .split(/(```[\s\S]*?```)/g)
        .map((segment, index) =>
          index % 2 === 0 ? stripProseSegment(segment) : segment,
        ),
    )
  ).join("");

  // Clean up multiple newlines across the whole document (whitespace-only, so
  // safe to run over code fences too).
  content = content.replace(/\n{3,}/g, "\n\n");

  return content.trim();
}

/**
 * Strip MDX/JSX page machinery from a single prose segment.
 *
 * Only runs on content *outside* fenced code blocks — see {@link stripMDXComponents}.
 * Notably, removing `import` lines here is intentional (it kills the MDX page's
 * `import { Cards } from "nextra/components"` noise) but must never touch
 * illustrative imports inside code samples, which are meaningful content.
 *
 * @param {string} content
 * @returns {Promise<string>}
 */
async function stripProseSegment(content) {
  // Drop `<Scale .../>` value tables — resolved values are served by get_tokens.
  // Lazy + dot-all so it spans multi-line tags whose attribute expressions may
  // themselves contain `>` (e.g. an arrow function inside `values={...}`).
  content = content.replace(/<Scale\b[\s\S]*?\/>/g, "");

  // Remove import statements (MDX page machinery)
  content = content.replace(/^import .+$/gm, "");

  // Remove JSX components that won't make sense to AI
  content = content.replace(/<Cards .+\/>/g, "");
  content = content.replace(/<Steps>/g, "");
  content = content.replace(/<\/Steps>/g, "");
  content = content.replace(/<Heading>/g, "");
  content = content.replace(/<\/Heading>/g, "");

  // Simplify Alert components - keep content but remove JSX
  content = content.replace(/<Alert[^>]*>/g, "\n> **Note:** ");
  content = content.replace(/<\/Alert>/g, "\n");

  // Remove paragraph tags
  content = content.replace(/<p[^>]*>/g, "");
  content = content.replace(/<\/p>/g, "\n");

  // Remove style attributes
  content = content.replace(/style=\{[^}]+\}/g, "");

  // Inline `<Demo component="x/y" />` as fenced code so the canonical examples
  // (style props, CSS variables, the `theme` object) survive into the guide
  // instead of being stripped to a dead tag. Done LAST so the inlined source —
  // which legitimately contains `import` lines and `style={...}` attributes — is
  // not mangled by the prose-cleanup regexes above.
  const demoRefs = [
    ...content.matchAll(/<Demo\b[\s\S]*?\bcomponent="([^"]+)"[\s\S]*?\/>/g),
  ];
  for (const match of demoRefs) {
    const replacement = await resolveDemoRef(match[1]);
    content = content.replace(match[0], replacement);
  }

  return content;
}
