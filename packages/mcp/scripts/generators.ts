import { tokens } from "@optiaxiom/globals";
import { getDocs } from "@optiaxiom/shared";
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type {
  ComponentInfo,
  DesignTokens,
  Metadata,
  PropDefinition,
} from "../src/index.js";

import {
  parseExamplesFromTags,
  parseLightDark,
  parsePropDefinition,
  remToPx,
  toKebabCase,
} from "./parsers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateComponents(): Promise<ComponentInfo[]> {
  const docs = getDocs({ shouldExtractValuesFromUnion: true });
  const components: ComponentInfo[] = [];

  // First pass: create all component metadata
  for (const doc of docs) {
    if (!doc.displayName.startsWith("@optiaxiom/react/")) {
      continue;
    }

    const name = doc.displayName.replace("@optiaxiom/react/", "");
    const props: Record<string, PropDefinition> = {};

    // If component extends another component, merge in the extended component's props first
    if (doc.tags.extends) {
      const extendedDoc = docs.find(
        (doc) => doc.displayName === `@optiaxiom/react/${doc.tags.extends}`,
      );
      for (const prop of extendedDoc?.props || []) {
        props[prop.name] = parsePropDefinition(prop);
      }
    }
    // Then add/override with this component's own props
    for (const prop of doc.props) {
      props[prop.name] = parsePropDefinition(prop);
    }

    const component: ComponentInfo = {
      description:
        doc.description || `${name} component from Axiom Design System`,
      examples: parseExamplesFromTags(doc.tags.example),
      import: `import { ${name} } from '${
        "experimental" in doc.tags
          ? `@optiaxiom/react/unstable`
          : `@optiaxiom/react`
      }';`,
      name,
      props,
    };

    if ("since" in doc.tags && typeof doc.tags.since === "string") {
      component.since = doc.tags.since;
    }
    if ("group" in doc.tags && typeof doc.tags.group === "string") {
      component.group = doc.tags.group;
    }

    components.push(component);
  }

  // Second pass: build component groups and set docsUrl
  const componentsByGroup = new Map<string, string[]>();
  const componentsByName = new Map(
    components.map((component) => [component.name, component]),
  );

  // Collect all components in each group
  for (const component of components) {
    if (component.group) {
      const groupedComponents = componentsByGroup.get(component.group) ?? [];
      groupedComponents.push(component.name);
      componentsByGroup.set(component.group, groupedComponents);
    }
  }

  // Update components with group information, docsUrl, and inherit "since" from parent
  for (const component of components) {
    if (component.group) {
      // If this is the primary component (name matches group), add components array
      if (component.name === component.group) {
        component.components = componentsByGroup.get(component.group) || [];
      } else {
        // This is a sub-component, check if it should inherit "since" from parent
        const parentComponent = componentsByName.get(component.group);
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

  return components;
}

export function generateComponentsIndex(components: ComponentInfo[]): string {
  const imports = components
    .map(
      (component) =>
        `import ${component.name}$0 from "./${component.name}.json" with { type: "json" };`,
    )
    .join("\n");

  const exports = `
export const components = {
${components.map((component) => `  ${component.name}: ${component.name}$0,`).join("\n")}
};

export type ComponentName = keyof typeof components;
`;

  return `${imports}\n${exports}`;
}

export async function generateMetadataFile(): Promise<Metadata> {
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

export async function generateTokens(): Promise<DesignTokens> {
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
        .filter((entry): entry is [string, string] => entry !== null),
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
