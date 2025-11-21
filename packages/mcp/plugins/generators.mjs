import { tokens } from "@optiaxiom/globals";
import { getDocs } from "@optiaxiom/shared";
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  parseDemosFromFiles,
  parseLightDark,
  parsePropDefinition,
  remToPx,
  toKebabCase,
} from "./parsers.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {import('playwright').BrowserContext} BrowserContext
 * @typedef {import('../src/types.js').ComponentInfo} ComponentInfo
 * @typedef {import('../src/types.js').DesignTokens} DesignTokens
 * @typedef {import('../src/types.js').Guide} Guide
 * @typedef {import('../src/types.js').Metadata} Metadata
 */

/**
 * @param {BrowserContext} context
 * @returns {Promise<Record<string, ComponentInfo>>}
 */
export async function generateComponents(context) {
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

    /** @type {ComponentInfo} */
    const component = {
      description:
        doc.description || `${name} component from Axiom Design System`,
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

  // Update components with group information, docsUrl, and inherit "since" from parent
  for (const component of Object.values(components)) {
    if (component.group) {
      // If this is the primary component (name matches group), add components array
      if (component.name === component.group) {
        component.components = componentsByGroup.get(component.group) || [];
      } else {
        // This is a sub-component, check if it should inherit "since" from parent
        const parentComponent = components[component.group];
        if (parentComponent?.since && !component.since) {
          component.since = parentComponent.since;
        }
      }

      // Set docsUrl to point to the group component
      component.docsUrl = `https://optimizely-axiom.github.io/optiaxiom/components/${toKebabCase(component.group)}`;
    } else {
      // No group, use own name for docsUrl
      component.docsUrl = `https://optimizely-axiom.github.io/optiaxiom/components/${toKebabCase(component.name)}`;
    }
  }

  // Third pass: Parse all component demos in parallel (includes screenshot capture)
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
          context,
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
 * @returns {Promise<Metadata>}
 */
export async function generateMetadataFile() {
  const packageJsonPath = join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));
  const axiomPackageJson = JSON.parse(
    await readFile(
      join(__dirname, "..", "..", "react", "package.json"),
      "utf-8",
    ),
  );

  return {
    // Use mtime of package.json for deterministic timestamps
    generatedAt: (await stat(packageJsonPath)).mtime.toISOString(),
    generator: {
      name: packageJson.name,
      version: packageJson.version,
    },
    source: {
      package: axiomPackageJson.name,
      version: axiomPackageJson.version,
    },
  };
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
