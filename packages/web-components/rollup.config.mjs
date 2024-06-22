import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

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
