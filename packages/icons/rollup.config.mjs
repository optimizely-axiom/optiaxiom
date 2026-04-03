import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
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

/** @returns {import('rollup').Plugin} */
function materialSymbolsPlugin() {
  const prefix = "\0material-symbol:";

  return {
    name: "material-symbols",

    resolveId(source, importer) {
      if (source.endsWith(".svg") && importer) {
        const resolved = resolve(dirname(importer), source);
        return { id: `${prefix}${resolved}` };
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
      const unfilledPath = parseSvgPath(svgContent);

      // Read the corresponding filled SVG
      const fillFilePath = filePath.replace(/\.svg$/, "-fill.svg");
      const fillSvgContent = readFileSync(fillFilePath, "utf-8");
      const filledPath = parseSvgPath(fillSvgContent);

      return {
        code: `
import { createElement, forwardRef } from "react";
import { MaterialIcon } from "@optiaxiom/react/unstable";

const ${componentName} = forwardRef(
  function ${componentName}(props, ref) {
    return createElement(MaterialIcon, {
      filledPath: ${unfilledPath === filledPath ? "undefined" : JSON.stringify(filledPath)},
      ref,
      unfilledPath: ${JSON.stringify(unfilledPath)},
      ...props,
    });
  },
);

${componentName}.displayName = "@optiaxiom/icons/${componentName}";

export { ${componentName} };
`,
      };
    },
  };
}

function parseSvgPath(svgContent) {
  const pathRegex = /<path\s+d="([^"]+)"[^/]*\/>/g;
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    return match[1];
  }
  throw new Error("Could not find path");
}

/**
 * Map from SVG file base name to exported component name.
 */
function svgToComponentName(svgFileName) {
  const name = svgFileName.replace(/\.svg$/, "").replace(/-fill$/, "");

  // Convert snake_case to PascalCase
  const pascal = name
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  return `Icon${pascal}`;
}

export default defineConfig([
  {
    external,
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
    external,
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
