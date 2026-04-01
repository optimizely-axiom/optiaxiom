import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { createFilter } from "@rollup/pluginutils";
import fg from "fast-glob";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import postcss from "postcss";
import postcssrc from "postcss-load-config";
import docgen from "react-docgen-typescript";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const external = new RegExp(
  "^(?:" +
    ["@stencil/core/internal", "react", "react-dom"].join("|") +
    ")(?:/.+)?$",
);
const require = createRequire(import.meta.url);
const env = process.env.NODE_ENV ?? "development";
const pkg = JSON.parse(readFileSync("./package.json"));

const input = Object.fromEntries(
  Object.entries(pkg.exports).map(([key, value]) => [
    key === "." ? "index" : value.replace("./dist/", "").replace(".js", ""),
    value.replace("./dist/", "src/").replace(".js", ".ts"),
  ]),
);

export default defineConfig([
  {
    input,
    onwarn(warning, warn) {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
        return;
      }
      warn(warning);
    },
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      aliasPlugin({
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/client": "preact/compat/client",
        "react-is": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      }),
      nodeResolve({
        preferBuiltins: false,
      }),
      commonjs({
        include: [
          "**/node_modules/attr-accept/**",
          "**/node_modules/prop-types/**",
          "**/node_modules/use-sync-external-store/**",
        ],
      }),
      /**
       * ============================================================================
       * SHADOW DOM COMPATIBILITY PATCHES
       * ============================================================================
       *
       * These rollup transforms modify third-party libraries (Radix, Downshift) at
       * BUILD TIME to work correctly inside Web Components with Shadow DOM.
       *
       * IMPORTANT: These patches ONLY apply to the web-components package build.
       * The React package, Storybook, and tests use the unmodified libraries.
       *
       * Why not use pnpm patch?
       * - pnpm patch affects ALL packages in the monorepo globally
       * - We only need shadow DOM fixes for web-components, not for React components
       * - Rollup transforms are scoped to this package's build process
       *
       * Each transform below documents:
       * - What problem it solves
       * - Why it's needed
       * - Examples of when it matters
       * ============================================================================
       */
      {
        name: "axiom:theme-provider",
        /**
         * Shadow DOM Compatibility: CSS :root selector
         *
         * Problem: In shadow DOM, :root refers to the document root, not the shadow root
         * Solution: Replace :root with :host to target the shadow root host element
         *
         * This ensures theme CSS variables are scoped to each web component instance
         */
        transform(code, id) {
          if (
            !(
              code.includes(":root") &&
              id.includes("packages/react/src/theme-provider")
            )
          ) {
            return null;
          }

          return code.replace(":root", ":host");
        },
      },
      {
        name: "downshift",
        /**
         * Downshift Library Optimization
         *
         * Problem: Downshift includes class components and PropTypes that don't work with Preact
         * Solution: Strip out the class-based Downshift component and PropTypes validation
         *
         * What's removed:
         * - Class-based Downshift component (we only use useCombobox hook)
         * - react-is dependency (not needed for hooks)
         * - PropTypes declarations and validation calls
         *
         * This reduces bundle size and prevents Preact compatibility issues
         */
        transform(code, id) {
          if (!id.includes("node_modules/downshift")) {
            return null;
          }

          return (
            code.slice(
              0,
              code.indexOf("var Downshift = /*#__PURE__*/function () {"),
            ) +
            "\n" +
            code.slice(code.indexOf("var dropdownDefaultStateValues = {"))
          )
            .replace("Downshift as default,", "")
            .replace("import { isForwardRef } from 'react-is';", "")
            .replace(
              /var (propTypes|commonPropTypes|commonDropdownPropTypes|propTypes\$\d)([^;]|\s)+;/g,
              "var $1 = _extends({})",
            )
            .replace(/PropTypes.checkPropTypes[^;]+;/g, "");
        },
      },
      {
        load(id) {
          if (!id.includes("prop-types")) {
            return null;
          }

          return "export default {}";
        },
        name: "prop-types",
      },
      {
        name: "radix-collection:document-querySelectorAll",
        /**
         * Shadow DOM Compatibility: querySelectorAll across shadow boundaries
         *
         * Problem: querySelectorAll() doesn't pierce shadow DOM boundaries
         * Solution: Also search inside slotted elements' shadow roots
         *
         * Why needed: Radix Collection uses querySelectorAll to find items (e.g., menu items).
         * In web components, some items might be slotted from light DOM and have their own
         * shadow roots. We need to search those too.
         *
         * Example: <ax-dropdown-menu-item> is slotted but has its own shadow root with
         * the actual focusable element inside
         */
        transform(code, id) {
          if (
            !(
              code.includes(".querySelectorAll(") &&
              id.includes("react-collection")
            )
          ) {
            return null;
          }

          return code.replace(
            /(\w+)\.querySelectorAll\(/,
            `((element, selector) => {
  const slots = element.querySelectorAll("slot");
  const result = [...element.querySelectorAll(selector)];
  for (const slot of slots) {
    for (const elem of slot.assignedElements()) {
      result.push(...(elem.shadowRoot ?? elem).querySelectorAll(selector));
    }
  }
  return result;
})($1,`,
          );
        },
      },
      {
        name: "radix-collection:react-useEffect",
        /**
         * Timing Fix: useEffect → useLayoutEffect
         *
         * Problem: useEffect runs AFTER the dropdown menu content gets focus, so Radix
         * Collection's DOM query hasn't run yet and can't find child nodes to focus
         * the first focusable item.
         *
         * Solution: Use useLayoutEffect to run synchronously before paint, ensuring
         * the collection is populated before focus management happens.
         *
         * Why needed: In DropdownMenu, focus moves to the menu content immediately on open.
         * Radix tries to focus the first item, but with useEffect, the collection hasn't
         * been built yet, so there are no items to focus.
         *
         * Original issue: commit 2557cbe2 (Oct 31, 2024)
         */
        transform(code, id) {
          if (
            !(code.includes("useEffect") && id.includes("react-collection"))
          ) {
            return null;
          }

          return code.replace("useEffect", "useLayoutEffect");
        },
      },
      {
        name: "active-element",
        /**
         * Shadow DOM Compatibility: document.activeElement traversal
         *
         * Problem: document.activeElement stops at shadow host, doesn't show actual focused element
         * Solution: Traverse shadow roots to find the deepest focused element
         *
         * Example:
         * Without patch: document.activeElement = <ax-menu-content>
         * With patch: document.activeElement = <input> (inside shadow root)
         *
         * Why needed: Many libraries check document.activeElement for focus management.
         * In shadow DOM, this needs to traverse into shadow roots to find the real target.
         */
        transform(code) {
          if (!code.includes("document.activeElement")) {
            return null;
          }

          return code.replaceAll(
            /(\w+\.)?document\.activeElement/g,
            (match) => `(() => {
  let active = ${match};
  while (active?.shadowRoot) {
    active = active.shadowRoot.activeElement;
  }
  return active;
})()`,
          );
        },
      },
      {
        name: "aria-hidden",
        /**
         * Shadow DOM Compatibility: aria-hidden management
         *
         * Problem: @radix-ui/react-aria-hidden sets aria-hidden on siblings to trap focus,
         * but doesn't handle shadow DOM boundaries
         *
         * Solution 1: When keeping elements, also keep slotted elements
         * - If parent is a shadow root, keep all slotted elements (they're outside the shadow)
         * - Navigate through shadow root to host for parent traversal
         *
         * Solution 2: Fix .contains() to work across shadow boundaries
         * - Traverse from target up through shadow roots to find if container contains it
         *
         * Why needed: Focus trap dialogs hide other content with aria-hidden. In shadow DOM,
         * we need to preserve slotted content and check containment across boundaries.
         */
        transform(code, id) {
          if (!id.includes("aria-hidden")) {
            return null;
          }

          return code
            .replace(
              "keep(el.parentNode)",
              `if (el.parentNode instanceof ShadowRoot) {
  for (const slot of el.parentNode.querySelectorAll('slot')) {
    for (const node of slot.assignedElements()) {
      elementsToKeep.add(node);
    }
  }
}
keep(el.parentNode instanceof ShadowRoot ? el.parentNode.host : el.parentNode)`,
            )
            .replaceAll(
              /(\w+)\.contains\(/g,
              `((container, target) => {
  while (target.getRootNode() instanceof ShadowRoot) {
    target = target.getRootNode().host;
  }
  return container.contains(target);
})($1,`,
            );
        },
      },
      {
        name: "radix-focus-scope",
        /**
         * Shadow DOM Compatibility: Radix FocusScope focus management
         *
         * This is the most complex patch - it fixes multiple issues with focus trapping in shadow DOM.
         *
         * Patch 1: Track focus through shadow roots
         * - Problem: event.target stops at shadow host
         * - Solution: Use composedPath()[0] to get the actual target inside shadow
         *
         * Patch 2: Scope event listeners to shadow root
         * - Problem: document.addEventListener in shadow DOM won't catch events inside
         * - Solution: Add listeners to the shadow root instead of document
         *
         * Patch 3: Fix .contains() for shadow DOM ⭐ THE MENU FIX
         * - Problem: container.contains() doesn't work across shadow boundaries
         * - Solution: If both elements are in the same shadow root, use native contains().
         *   Otherwise check if container's root host contains the target.
         * - Why needed for Menu: When FocusScope opens, downshift has already focused the
         *   input via useEffect. FocusScope then checks if a focused element is inside the
         *   container with contains(). Without this patch, it incorrectly returns false
         *   (because it traverses to the host), so FocusScope re-runs focusFirst() and
         *   falls back to focusing the dialog container, stealing focus from the input.
         *
         * Example (Menu):
         *   <ax-menu-content shadow>
         *     <div role="dialog" tabindex="-1">  ← FocusScope container
         *       <input role="combobox">          ← Already focused by downshift
         *   → container.contains(input) must return true (same shadow root)
         *
         * Example (cross-boundary):
         *   <ax-alert-dialog-content shadow>     ← FocusScope container is inside
         *     <ax-alert-dialog-cancel>           ← Target is in light DOM (slotted)
         *   → Must traverse to host to check containment
         */
        transform(code, id) {
          if (!id.includes("react-focus-scope")) {
            return null;
          }

          return code
            .replace(
              "lastFocusedElementRef.current = target",
              "lastFocusedElementRef.current = event.target.shadowRoot ? event.composedPath()[0] : event.target",
            )
            .replace(
              "document.addEventListener",
              "const root = container?.getRootNode() ?? document; document.addEventListener",
            )
            .replaceAll("document.addEventListener", "root.addEventListener")
            .replaceAll(
              "document.removeEventListener",
              "root.removeEventListener",
            )
            .replaceAll(
              /(\w+)\.contains\(/g,
              `((container, target) => {
  if (container.getRootNode() instanceof ShadowRoot) {
    // If both elements are in the same shadow root, use native contains
    if (container.getRootNode() === target?.getRootNode?.()) {
      return container.contains(target);
    }
    return container.getRootNode().host.contains(target);
  } else {
    return container.contains(target);
  }
})($1,`,
            );
        },
      },
      {
        name: "radix-portal:react-Portal",
        /**
         * Shadow DOM Compatibility: Disable React Portal
         *
         * Problem: React Portal renders to document.body, breaking shadow DOM encapsulation
         * Solution: Replace Portal with a simple pass-through component
         *
         * Why needed: In web components, we want everything to stay within the shadow root
         * for proper encapsulation and styling. Radix Portal would break out of the shadow
         * DOM and render at document level, causing:
         * - Style inheritance issues (theme tokens wouldn't apply)
         * - Event handling problems (clicks wouldn't bubble correctly)
         * - Z-index/stacking context issues
         *
         * Our replacement just clones the children with the ref, keeping everything local.
         */
        transform(_code, id) {
          if (!id.includes("react-portal")) {
            return null;
          }

          return `"use client";

import { cloneElement, forwardRef } from "react";
const PORTAL_NAME = "Portal";
const Portal = forwardRef((props, ref) => {
  return cloneElement(props.children, { ref });
});
Portal.displayName = PORTAL_NAME;
export { Portal, Portal as Root };`;
        },
      },
      esbuild({
        define: {
          "process.env.NODE_ENV": JSON.stringify(env),
        },
        exclude: [],
        minify: env === "production",
        target: "es2022",
      }),
      json(),
      stylePlugin({ include: ["**/*.css"] }),
      webComponentPlugin({
        include: [
          "src/components/**/*.ts",
          "src/index.ts",
          process.cwd() + "/src/mapping",
          process.cwd() + "/src/propTypes",
        ],
      }),
    ],
  },
  {
    external,
    input: Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        key,
        value.replace(".ts", ".d.ts"),
      ]),
    ),
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      typeDeclarationPlugin({
        include: ["src/components/**/*.d.ts", "src/index.d.ts"],
      }),
      dts({
        respectExternal: true,
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);

/** @returns {import('rollup').Plugin} */
function aliasPlugin(aliases = {}) {
  return {
    name: "rollup-plugin-alias",
    resolveId(source) {
      const alias = aliases[source];
      return alias ? this.resolve(alias) : null;
    },
  };
}

/** @returns {import('rollup').Plugin} */
function stylePlugin({ exclude = [], include = [] } = {}) {
  const filter = createFilter(include ?? [], exclude ?? []);

  /** @returns {Promise<postcssrc.Result>} */
  const getPostcssConfig = async () => {
    if (getPostcssConfig.cache) {
      return getPostcssConfig.cache;
    }

    getPostcssConfig.cache = await postcssrc({}, process.cwd());
    return getPostcssConfig.cache;
  };

  return {
    name: "rollup-plugin-style",
    async transform(code, id) {
      if (!filter(id)) {
        return null;
      }

      const { options, plugins } = await getPostcssConfig();
      const { css } = await postcss(plugins).process(code, {
        ...options,
        from: id,
        to: "dist/index.css",
      });
      return [
        `import { injectGlobalStyle, injectLocalStyle } from '${require.resolve("./src/styles.ts")}';`,
        id.includes("node_modules")
          ? `injectGlobalStyle(${JSON.stringify(css)})`
          : `injectLocalStyle(${JSON.stringify(css)})`,
      ].join("\n");
    },
  };
}

/** @returns {import('rollup').Plugin} */
function typeDeclarationPlugin({ include = [] }) {
  const filter = createFilter(include ?? []);
  const docs = docgen
    .withCompilerOptions(
      { esModuleInterop: true },
      {
        propFilter: (prop) =>
          prop.parent
            ? prop.parent.fileName.includes("@types/react")
              ? prop.name === "ref"
              : true
            : true,
        savePropValueAsString: true,
        shouldExtractValuesFromUnion: true,
        skipChildrenPropWithoutDoc: false,
      },
    )
    .parse(fg.globSync("../react/dist/**/*.d.ts"));
  const box = docs.find((doc) => doc.displayName === "Box");

  const generateDts = (id) => {
    const component = path.parse(id).name.replace(".d", "");
    if (!existsSync(component)) {
      mkdirSync(component);
    }
    writeFileSync(
      `${component}/package.json`,
      `{
  "types": "../dist/components/${component}.d.ts",
  "module": "../dist/components/${component}.js"
}`,
    );

    const doc = docs.find((doc) => doc.displayName === component);
    const propTypes = Object.values(doc?.props ?? {})
      .filter(
        ({ name, type }) =>
          !(
            type.name.startsWith("RefObject<") ||
            name === "children" ||
            name === "ref"
          ),
      )
      .filter(
        ({ name, type }) =>
          component === "Box" ||
          name === "asChild" ||
          !("asChild" in doc.props && component !== "ModalLayer") ||
          !(name in box.props) ||
          box.props[name].type.raw !== type.raw,
      )
      .flatMap(({ name, type }) => {
        const props = [
          `"${name}"?: ${
            type.raw === "ReactNode"
              ? "string | number | false | true"
              : type.raw
                ? type.value
                    .map(({ value }) =>
                      value.startsWith("ResponsiveArray<")
                        ? `ResponsiveArray<${type.value
                            .map(({ value }) => value)
                            .filter(
                              (value) =>
                                !(
                                  value.startsWith("ResponsiveArray<") ||
                                  value.startsWith("{ ")
                                ),
                            )
                            .join(" | ")}>`
                        : value.startsWith("{ ")
                          ? `ResponsiveObject<${type.value
                              .map(({ value }) => value)
                              .filter(
                                (value) =>
                                  !(
                                    value.startsWith("ResponsiveArray<") ||
                                    value.startsWith("{ ")
                                  ),
                              )
                              .join(" | ")}>`
                          : value.startsWith("(")
                            ? `(${value})`
                            : value,
                    )
                    .join(" | ")
                : type.name
          };`,
        ];
        if (name.toLowerCase() !== name && !name.startsWith("on")) {
          props.push(
            `"${toKebabCase(name)}"?: ${
              type.raw === "ReactNode"
                ? "string"
                : type.raw
                  ? type.value
                      .map(({ value }) => value)
                      .filter(
                        (value) =>
                          !(
                            value.startsWith("ResponsiveArray<") ||
                            value.startsWith("{ ")
                          ),
                      )
                      .join(" | ")
                  : type.name
            };`,
          );
        }
        return props;
      });

    const ref = doc.props.ref?.type.raw
      .match(/<([^>]+)>/)[1]
      .split(" & ")
      .map((instance) =>
        instance
          .replace(/^(HTML|SVG)/, "")
          .replace(/Element$/, "")
          .toLowerCase()
          .replace("anchor", "a")
          .replace("heading", "h1")
          .replace("paragraph", "p")
          .replace("olist", "ol")
          .replace("ulist", "ul"),
      );

    const extendsBox =
      component !== "Box" &&
      "asChild" in doc.props &&
      component !== "ModalLayer";

    return `export const ${component} = "ax${toKebabCase(component)}";

export type ${component}Props = ${extendsBox ? "BoxProps & " : ""} {
  ${propTypes.join("\n")}
};

declare module "@stencil/core" {
  namespace JSX {
    interface IntrinsicElements {
      [${component}]: ${component}Props${
        ref
          ? ` & Omit<(${ref
              .map(
                (tagName) =>
                  `JSXBase.IntrinsicElements["${tagName || "main"}"]`,
              )
              .join(" | ")}), keyof ${component}Props>`
          : ""
      };
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      [${component}]: ${component}Props${
        ref
          ? ` & Omit<(${ref
              .map(
                (tagName) => `ComponentPropsWithoutRef<"${tagName || "main"}">`,
              )
              .join(" | ")}), keyof ${component}Props>`
          : doc.props.children
            ? " & { children?: ReactNode }"
            : ""
      };
    }
  }
}`;
  };

  return {
    load(id) {
      if (!filter(id)) {
        return null;
      }

      return (
        id.endsWith("/index.d.ts")
          ? [
              'import type { JSXBase } from "@stencil/core/internal";',
              'import type { ComponentPropsWithoutRef, ReactNode } from "react";',
              'import type { ChangeEventHandler, FocusEventHandler, FocusOutsideEvent, PointerDownOutsideEvent, ResponsiveArray, ResponsiveObject, SwipeEvent, Toaster } from "./types";',
              ...Object.entries(input).map(([key, value]) =>
                key === "index" ? "" : generateDts(value),
              ),
            ]
          : [
              'import type { JSXBase } from "@stencil/core/internal";',
              'import type { ComponentPropsWithoutRef, ReactNode } from "react";',
              'import type { ChangeEventHandler, FocusEventHandler, FocusOutsideEvent, PointerDownOutsideEvent, ResponsiveArray, ResponsiveObject, SwipeEvent, Toaster } from "../types";',
              id.endsWith("/Box.d.ts")
                ? ""
                : 'import type { BoxProps } from "./Box";',
              generateDts(id),
            ]
      ).join("\n");
    },
    name: "rollup-plugin-type-declaration",
    order: "pre",
    async resolveId(id, importer) {
      const resolved = importer
        ? path.resolve(path.dirname(importer), id + ".d.ts")
        : path.resolve(id);
      if (filter(resolved)) {
        return resolved;
      }

      return null;
    },
  };
}

/** @returns {import('rollup').Plugin} */
function webComponentPlugin({ include = [] }) {
  const prefix = `\0virtual:`;
  const filter = createFilter(include ?? []);
  const docs = docgen
    .withCompilerOptions(
      { esModuleInterop: true },
      {
        propFilter: (prop) =>
          prop.parent
            ? prop.parent.fileName.includes("@types/react")
              ? ["defaultChecked", "defaultValue"].includes(prop.name)
              : true
            : true,
        savePropValueAsString: true,
        shouldExtractValuesFromUnion: true,
      },
    )
    .parse(fg.globSync("../react/dist/**/*.d.ts"));

  return {
    load(id) {
      if (!id.startsWith(prefix)) {
        return null;
      }

      const component = path.parse(id).name;

      switch (component) {
        case "index":
          return `import { factory } from "./factory";

${Object.entries(input)
  .map(([key, value]) => {
    const component = path.parse(value).name;
    return key === "index"
      ? ""
      : `import { ${component}Props } from "./propTypes";

export const ${component} = "ax${toKebabCase(component)}"
if (!customElements.get(${component})) {
  customElements.define(${component}, factory(${component}, "${component}", ${component}Props));
}`;
  })
  .join("\n")}`;
        case "mapping":
          return `export const components = new Set([${Object.entries(input)
            .map(([key, value]) => {
              const component = path.parse(value).name;
              return key === "index" ? "" : `"ax${toKebabCase(component)}",`;
            })
            .join("\n")}]);`;
        case "propTypes":
          return Object.entries(input)
            .map(([key, value]) => {
              const component = path.parse(value).name;
              const doc = docs.find((doc) => doc.displayName === component);
              const propTypes = Object.fromEntries(
                Object.entries(doc?.props ?? {}).flatMap(([name, value]) => {
                  const type = name.startsWith("on")
                    ? "function"
                    : getPropType(value.type);
                  return type ? [[name, type]] : [];
                }),
              );

              return key === "index"
                ? ""
                : `export const ${component}Props = ${JSON.stringify(propTypes)};`;
            })
            .join("\n");
        default:
          return `import { ${component} as ${component}Component } from "@optiaxiom/react";

import { components } from "../mapping";
import { ${component}Props } from "../propTypes";
import { register } from "../register";

export const ${component} = "ax${toKebabCase(component)}";
export default register(
  ${component},
  ${component}Component,
  ${component}Props,
  components,
);`;
      }
    },
    name: "rollup-plugin-web-component",
    async resolveId(id, importer, options) {
      if (filter(path.resolve(id))) {
        return prefix + path.resolve(id);
      }

      if (importer?.startsWith(prefix)) {
        const resolved = path.resolve(
          path.dirname(importer.slice(prefix.length)),
          id,
        );
        if (filter(resolved)) {
          return prefix + resolved;
        }
        return await this.resolve(id, importer.slice(prefix.length), options);
      }

      return null;
    },
  };
}

/**
 * @param {import('react-docgen-typescript').PropItemType} type
 */
const getPropType = (type) => {
  if (type.name === "number") {
    return "number";
  } else if (type.name === "string") {
    return "string";
  } else if (
    type.name === "enum" &&
    (type.raw === "boolean" || type.raw === "Booleanish")
  ) {
    return "boolean";
  } else if (type.raw === "ReactNode") {
    return "object";
  } else if (
    type.name === "enum" &&
    type.value.find(
      ({ value }) =>
        value.startsWith("ResponsiveArray<") || value.startsWith("{ "),
    )
  ) {
    return "object";
  } else if (
    type.name === "enum" &&
    Array.isArray(type.value) &&
    (type.value.find(
      (item) => item.value === "string" || item.value === "string & {}",
    ) ||
      type.value.every(
        (item) =>
          (item.value.startsWith('"') && item.value.endsWith('"')) ||
          ["false", "true"].includes(item.value) ||
          item.value.endsWith("[]"),
      ))
  ) {
    return "string";
  } else if (
    type.name === "enum" &&
    Array.isArray(type.value) &&
    type.value.every((item) => item.value === parseInt(item.value).toString())
  ) {
    return "number";
  } else if (type.name.startsWith('"') && type.name.endsWith('"')) {
    return "string";
  }
};

const toKebabCase = (str) =>
  str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
