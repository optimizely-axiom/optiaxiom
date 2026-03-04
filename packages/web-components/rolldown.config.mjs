import { createFilter } from "@rollup/pluginutils";
import fg from "fast-glob";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import postcss from "postcss";
import postcssrc from "postcss-load-config";
import docgen from "react-docgen-typescript";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

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
      minify: env === "production",
    },
    plugins: [
      aliasPlugin({
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/client": "preact/compat/client",
        "react-is": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      }),
      {
        name: "axiom:theme-provider",
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
        transform(code, id) {
          if (!id.includes("node_modules/downshift")) {
            return null;
          }

          /**
           * Remove incompatible and unused Downshift class based component
           */
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
    transform: {
      define: {
        "process.env.NODE_ENV": JSON.stringify(env),
      },
      target: "es2022",
    },
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
        dtsInput: true,
        emitDtsOnly: true,
        sourcemap: false,
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);

/** @returns {import('rolldown').Plugin} */
function aliasPlugin(aliases = {}) {
  return {
    name: "rolldown-plugin-alias",
    resolveId(source) {
      const alias = aliases[source];
      return alias ? this.resolve(alias) : null;
    },
  };
}

/** @returns {import('rolldown').Plugin} */
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
    name: "rolldown-plugin-style",
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
      return {
        code: [
          `import { injectGlobalStyle, injectLocalStyle } from '${require.resolve("./src/styles.ts")}';`,
          id.includes("node_modules")
            ? `injectGlobalStyle(${JSON.stringify(css)})`
            : `injectLocalStyle(${JSON.stringify(css)})`,
        ].join("\n"),
        moduleType: "js",
      };
    },
  };
}

/** @returns {import('rolldown').Plugin} */
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

    /**
     * For some reason rolldown-plugin-dts is naming Table as Table$1 in the
     * final d.ts. So we check for both names here.
     */
    const doc =
      docs.find((doc) => doc.displayName === component) ??
      docs.find((doc) => doc.displayName === component + "$1");
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
    name: "rolldown-plugin-type-declaration",
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

/** @returns {import('rolldown').Plugin} */
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
    name: "rolldown-plugin-web-component",
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
