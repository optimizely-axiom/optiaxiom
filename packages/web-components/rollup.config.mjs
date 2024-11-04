import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { createFilter } from "@rollup/pluginutils";
import fg from "fast-glob";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import postcss from "postcss";
import postcssrc from "postcss-load-config";
import docgen from "react-docgen-typescript";
import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";

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
        "react/jsx-runtime": "preact/jsx-runtime",
        "react-dom": "preact/compat",
        "react-dom/client": "preact/compat/client",
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
            "document.activeElement",
            `(() => {
  let active = document.activeElement;
  while (active?.shadowRoot) {
    active = active.shadowRoot.activeElement;
  }
  return active;
})()`,
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
      webComponentPlugin({ include: ["src/components/**/*.ts"] }),
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
function webComponentPlugin({ include = [] }) {
  const prefix = `\0virtual:`;
  const filter = createFilter(include ?? []);
  const docs = docgen
    .withCompilerOptions(
      { esModuleInterop: true },
      {
        propFilter: (prop) =>
          prop.parent ? !prop.parent.fileName.includes("@types/react") : true,
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
      const doc = docs.find((doc) => doc.displayName === component);
      const actions = Object.keys(doc?.props ?? {}).filter((name) =>
        name.startsWith("on"),
      );
      return `import { ${component} as ${component}Component } from "@optiaxiom/react";

import { register } from "../register";

export const ${component} = "ax${component.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}";
export default register(
  ${component},
  ${component}Component,
  { customEvents: ${JSON.stringify(actions)} },
);`;
    },
    name: "rollup-plugin-web-component",
    async resolveId(id, importer, options) {
      if (filter(path.resolve(id))) {
        return prefix + path.resolve(id);
      }

      if (importer?.startsWith(prefix)) {
        return await this.resolve(id, importer.slice(prefix.length), options);
      }

      return null;
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
