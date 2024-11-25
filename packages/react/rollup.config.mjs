import hash from "@emotion/hash";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { createFilter } from "@rollup/pluginutils";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { readFileSync } from "node:fs";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const env = process.env.NODE_ENV ?? "development";
const pkg = JSON.parse(readFileSync("./package.json"));
const bannerFilter = createFilter(["**/*.js"]);

export default defineConfig([
  {
    external: new RegExp(
      "^(?:" +
        Object.keys({
          ...pkg.dependencies,
          ...pkg.peerDependencies,
        }).join("|") +
        ")(?:/.+)?$",
    ),
    input: {
      index: "src/index.ts",
      unstable: "src/unstable.ts",
    },
    onwarn(warning, warn) {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
        return;
      }
      warn(warning);
    },
    output: {
      banner: async (chunk) => {
        if (bannerFilter(chunk.facadeModuleId)) {
          return '"use client";';
        }
        return "";
      },
      dir: "dist",
      entryFileNames: (info) => {
        return info.name.endsWith(".css")
          ? `${info.name.replace(/\.css$/, "-css")}.js`
          : "[name].js";
      },
      format: "es",
      preserveModules: true,
    },
    plugins: [
      {
        name: "sprinkles-merge",
        transform(code, id) {
          if (!id.endsWith("src/sprinkles/sprinkles.ts")) {
            return null;
          }

          const search = `import { createMapValueFn, createSprinkles } from "@vanilla-extract/sprinkles";`;
          const replace = [
            `import { createMapValueFn } from "@vanilla-extract/sprinkles/createUtils";`,
            `import { createSprinkles } from "@vanilla-extract/sprinkles/createRuntimeSprinkles";`,
          ].join("\n");
          if (!code.includes(search)) {
            throw new Error("Could not find sprinkles imports to rewrite");
          }
          return code.replace(search, replace);
        },
      },
      nodeResolve({
        preferBuiltins: false,
      }),
      esbuild({
        define: {
          "process.env.NODE_ENV": JSON.stringify(env),
        },
        target: "esnext",
      }),
      json(),
      vanillaExtractPlugin(
        env === "production"
          ? {
              identifiers: (options) =>
                normalizeIdentifier(hash(`${pkg.version}_${options.hash}`)),
            }
          : {},
      ),
    ],
  },
  {
    input: {
      index: "src/index.ts",
      unstable: "src/unstable.ts",
    },
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [dts()],
  },
]);

function normalizeIdentifier(identifier) {
  return identifier.match(/^[0-9]/) ? "_".concat(identifier) : identifier;
}
