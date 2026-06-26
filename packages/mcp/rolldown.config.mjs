import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

import pkg from "./package.json" with { type: "json" };
import { generateDataPlugin } from "./plugins/rollup-plugin-generate-data.mjs";

const env = process.env.NODE_ENV ?? "development";
const external = new RegExp(
  "^(?:" + Object.keys(pkg.dependencies).join("|") + ")(?:/.+)?$",
);

export default defineConfig([
  {
    external,
    input: ["src/index.ts", "src/data.ts"],
    output: {
      dir: "dist",
      format: "es",
      preserveModules: true,
    },
    plugins: [generateDataPlugin()],
    transform: {
      define: {
        "process.env.NODE_ENV": JSON.stringify(env),
      },
      target: "esnext",
    },
  },
  {
    input: ["src/index.ts", "src/data.ts"],
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      dts({
        emitDtsOnly: true,
        sourcemap: false,
        tsconfig: "tsconfig.build.json",
        tsgo: true,
      }),
    ],
  },
]);
