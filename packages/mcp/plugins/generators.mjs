import { tokens } from "@optiaxiom/globals";
import { getDocs } from "@optiaxiom/shared";
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

/**
 * @returns {Promise<Record<string, Guide>>}
 */
export async function generateGuides() {
  const guidesDir = join(
    __dirname,
    "..",
    "..",
    "..",
    "apps",
    "docs",
    "app",
    "(docs)",
    "guides",
  );

  const guides = [
    {
      name: "getting-started",
      path: join(guidesDir, "page.mdx"),
      title: "Getting Started",
    },
    {
      name: "css-imports",
      path: join(guidesDir, "css-imports", "page.mdx"),
      title: "CSS Imports",
    },
    {
      name: "css-layers",
      path: join(guidesDir, "css-layers", "page.mdx"),
      title: "CSS Layers",
    },
    {
      name: "icons",
      path: join(guidesDir, "icons", "page.mdx"),
      title: "Icons",
    },
  ];

  /** @type {Record<string, Guide>} */
  const result = {};

  for (const guide of guides) {
    const content = await readFile(guide.path, "utf-8");
    result[guide.name] = {
      content: stripMDXComponents(content),
      name: guide.name,
      title: guide.title,
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
    const entries = await readdir(dir, { withFileTypes: true });
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
 * Clean MDX content for better AI consumption
 * @param {string} content
 * @returns {string}
 */
function stripMDXComponents(content) {
  // Remove import statements
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

  // Clean up multiple newlines
  content = content.replace(/\n{3,}/g, "\n\n");

  return content.trim();
}
