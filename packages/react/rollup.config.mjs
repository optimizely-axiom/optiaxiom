import hash from "@emotion/hash";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import {
  getSourceFromVirtualCssFile,
  virtualCssFileFilter,
} from "@vanilla-extract/integration";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import autoprefixer from "autoprefixer";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import postcss from "postcss";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const env = process.env.NODE_ENV ?? "development";
const pkg = JSON.parse(readFileSync("./package.json"));
const external = new RegExp(
  "^(?:" +
    Object.keys({
      ...pkg.dependencies,
      ...pkg.peerDependencies,
    }).join("|") +
    ")(?:/.+)?$",
);

export default defineConfig([
  {
    external,
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
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
      },
      {
        dir: "dist/esm",
        entryFileNames: (info) => {
          return info.name.endsWith(".css")
            ? `${info.name.replace(/\.css$/, "-css")}.js`
            : "[name].js";
        },
        format: "es",
        preserveModules: true,
      },
    ],
    plugins: [
      {
        name: "preserve-directives",
        renderChunk(code, chunk) {
          const directives = chunk.moduleIds.some(
            (id) => this.getModuleInfo(id).meta.preserveDirectives,
          );
          return directives ? '"use client";\n' + code : code;
        },
        transform(code, id) {
          if (
            code.startsWith('"use client";') ||
            id.endsWith(".tsx") ||
            id.includes("node_modules/@mantine/hooks")
          ) {
            return { code, meta: { preserveDirectives: "client" } };
          }

          return null;
        },
      },
      {
        name: "sprinkles-merge",
        transform(code, id) {
          if (!id.endsWith("src/sprinkles/sprinkles.ts")) {
            return null;
          }

          const search = `import {
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
} from "@vanilla-extract/sprinkles";`;
          const replace = [
            `import { createMapValueFn, createNormalizeValueFn } from "@vanilla-extract/sprinkles/createUtils";`,
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
      env === "production" && stylePlugin(),
      vanillaExtractPlugin(
        env === "production"
          ? {
              identifiers: (options) =>
                normalizeIdentifier(hash(`${pkg.version}_${options.hash}`)),
            }
          : {},
      ),
      env !== "production" && {
        async generateBundle(options, bundle) {
          for (const [fileName, chunk] of Object.entries(bundle)) {
            try {
              const existing = await readFile(resolve(options.dir, fileName), {
                encoding: "utf-8",
              });
              if (existing === chunk.code) {
                delete bundle[fileName];
              }
            } catch {
              /* empty */
            }
          }
        },
        name: "optimize-generate-bundle",
      },
    ],
  },
  {
    external,
    input: {
      index: "src/index.ts",
      unstable: "src/unstable.ts",
    },
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      dts({
        respectExternal: true,
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);

function normalizeIdentifier(identifier) {
  return identifier.match(/^[0-9]/) ? "_".concat(identifier) : identifier;
}

/** @returns {import('rollup').Plugin} */
function stylePlugin() {
  return {
    name: "rollup-plugin-style",
    async resolveId(id) {
      if (!virtualCssFileFilter.test(id)) {
        return null;
      }

      const { fileName, source } = await getSourceFromVirtualCssFile(id);
      const result = await postcss([autoprefixer]).process(source, {
        from: fileName,
      });
      return {
        external: true,
        id: fileName,
        meta: {
          css: result.css,
        },
      };
    },
  };
}
