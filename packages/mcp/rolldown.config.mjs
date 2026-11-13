import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

import reactPkg from "../react/package.json" with { type: "json" };
import pkg from "./package.json" with { type: "json" };
import { generateDataPlugin } from "./plugins/rollup-plugin-generate-data.mjs";

const env = process.env.NODE_ENV ?? "development";
const external = new RegExp(
  "^(?:" + Object.keys(pkg.dependencies).join("|") + ")(?:/.+)?$",
);

export default defineConfig([
  {
    external,
    input: ["src/index.ts", "src/cli.ts"],
    output: {
      dir: "dist",
      format: "es",
      preserveModules: true,
    },
    plugins: [generateDataPlugin()],
    transform: {
      define: {
        "process.env.NODE_ENV": JSON.stringify(env),
        "process.env.REACT_VERSION": JSON.stringify(reactPkg.version),
      },
      target: "esnext",
    },
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      dts({
        dtsOnly: true,
        generator: "tsgo",
        sourcemap: false,
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);
