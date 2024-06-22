import { nodeResolve } from "@rollup/plugin-node-resolve";
import { createFilter } from "@rollup/pluginutils";
import { createRequire } from "node:module";
import postcss from "postcss";
import postcssrc from "postcss-load-config";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const require = createRequire(import.meta.url);
const env = process.env.NODE_ENV ?? "development";

const input = {
  Box: "src/Box.ts",
  index: "src/index.ts",
};

export default defineConfig([
  {
    input,
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
      esbuild({
        define: {
          "process.env.NODE_ENV": JSON.stringify(env),
        },
        exclude: [],
        minify: env === "production",
      }),
      nodeResolve({
        preferBuiltins: false,
      }),
      stylePlugin({ include: ["**/*.css"] }),
    ],
  },
  {
    input,
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [dts({ compilerOptions: { types: ["node"] } })],
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
        `import { injectStyle } from '${require.resolve("./src/styles.ts")}';`,
        `injectStyle(${JSON.stringify(css)})`,
      ].join("\n");
    },
  };
}
