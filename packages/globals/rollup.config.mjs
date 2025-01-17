import { createFilter } from "@rollup/pluginutils";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { readFileSync } from "node:fs";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const env = process.env.NODE_ENV ?? "development";
const pkg = JSON.parse(readFileSync("./package.json"));
const bannerFilter = createFilter(["**/context.ts", "**/toast-context.ts"]);

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
    output: {
      banner: (chunk) => {
        if (
          env === "production"
            ? bannerFilter(chunk.facadeModuleId)
            : chunk.name === "client"
        ) {
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
      manualChunks:
        env === "production"
          ? undefined
          : (id) => {
              if (bannerFilter(id)) {
                return "client";
              }
              return "server";
            },
      preserveModules: env === "production",
    },
    plugins: [
      esbuild({
        define: {
          "process.env.NODE_ENV": JSON.stringify(env),
        },
        target: "esnext",
      }),
      vanillaExtractPlugin(),
    ],
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
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);
