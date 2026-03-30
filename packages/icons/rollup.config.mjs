import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { resolve } from "node:path";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const env = process.env.NODE_ENV ?? "development";
const pkg = JSON.parse(readFileSync("./package.json"));

/** @returns {import('rollup').Plugin} */
function materialSymbolsPlugin() {
  const prefix = "\0material-symbol:";

  return {
    name: "material-symbols",

    resolveId(source, importer) {
      if (source.startsWith("@material-symbols/") && source.endsWith(".svg")) {
        const resolved = resolve("node_modules", source);
        return { id: `${prefix}${resolved}` };
      }
      if (source === "./src/resolveSize" && importer?.startsWith(prefix)) {
        return { external: false, id: resolve("src/resolveSize.ts") };
      }
      return null;
    },

    load(id) {
      if (!id.startsWith(prefix)) {
        return null;
      }

      const filePath = id.slice(prefix.length);
      const svgContent = readFileSync(filePath, "utf-8");
      const componentName = svgToComponentName(basename(filePath));
      const paths = parseSvgPaths(svgContent);

      const pathElements = paths
        .map((d) => `_jsx("path", { d: ${JSON.stringify(d)} })`)
        .join(", ");

      return {
        code: `
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { resolveSize } from "./src/resolveSize";

const ${componentName} = forwardRef(
  function ${componentName}({ size = 20, ...props }, ref) {
    const resolved = resolveSize(size);
    return _jsxs("svg", {
      fill: "currentColor",
      height: resolved,
      ref,
      viewBox: "0 -960 960 960",
      width: resolved,
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [${pathElements}],
    });
  },
);

export default ${componentName};
`,
      };
    },
  };
}

function parseSvgPaths(svgContent) {
  const paths = [];
  const pathRegex = /<path\s+d="([^"]+)"[^/]*\/>/g;
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

/**
 * Map from SVG file base name to exported component name.
 *
 * - Regular (outlined) icons: `IconFoo`
 * - Filled icons (`*-fill.svg`): `IconFooFilled`
 */
function svgToComponentName(svgFileName) {
  const name = svgFileName.replace(/\.svg$/, "");
  const filled = name.endsWith("-fill");
  const base = filled ? name.replace(/-fill$/, "") : name;

  // Convert snake_case to PascalCase
  const pascal = base
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  return `Icon${pascal}${filled ? "Filled" : ""}`;
}

export default defineConfig([
  {
    external: new RegExp(
      "^(?:" +
        Object.keys({
          ...pkg.peerDependencies,
        }).join("|") +
        ")(?:/.+)?$",
    ),
    input: {
      index: "src/index.ts",
    },
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
      },
      {
        dir: "dist/esm",
        format: "es",
        preserveModules: true,
      },
    ],
    plugins: [
      materialSymbolsPlugin(),
      esbuild({
        jsx: "automatic",
        target: "esnext",
      }),
      env !== "production" && {
        async generateBundle(options, bundle) {
          for (const [fileName, chunk] of Object.entries(bundle)) {
            try {
              const existing = await readFile(resolve(options.dir, fileName), {
                encoding: "utf-8",
              });
              if (existing === (chunk.code ?? chunk.source)) {
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
    external: new RegExp(
      "^(?:" +
        Object.keys({
          ...pkg.peerDependencies,
        }).join("|") +
        ")(?:/.+)?$",
    ),
    input: {
      index: "src/index.ts",
    },
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      materialSymbolsPlugin(),
      dts({
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);
