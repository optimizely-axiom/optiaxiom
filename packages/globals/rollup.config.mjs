import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import { readFileSync } from "node:fs";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const env = process.env.NODE_ENV ?? "development";
const pkg = JSON.parse(readFileSync("./package.json"));

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
