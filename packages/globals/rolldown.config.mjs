import { createFilter } from "@rollup/pluginutils";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

const env = process.env.NODE_ENV ?? "development";
const pkg = JSON.parse(readFileSync("./package.json"));
const bannerFilter = createFilter([
  "**/context.ts",
  "**/surface-context.ts",
  "**/toast-context.ts",
]);

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
      fonts: "src/fonts.ts",
      index: "src/index.ts",
    },
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
      },
      {
        banner: (chunk) => {
          if (bannerFilter(chunk.facadeModuleId)) {
            return '"use client";';
          }
          return "";
        },
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
      vanillaExtractPlugin(),
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
    transform: {
      define: {
        "process.env.NODE_ENV": JSON.stringify(env),
      },
      target: "esnext",
    },
  },
  {
    input: {
      index: "src/index.ts",
    },
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      dts({
        emitDtsOnly: true,
        sourcemap: false,
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);
