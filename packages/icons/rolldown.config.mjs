import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

const env = process.env.NODE_ENV ?? "development";
const watch = process.env.ROLLDOWN_WATCH === "true";
const pkg = JSON.parse(readFileSync("./package.json"));
const external = new RegExp(
  "^(?:" +
    Object.keys({
      ...pkg.dependencies,
      ...pkg.peerDependencies,
    }).join("|") +
    ")(?:/.+)?$",
);

// Every icon also gets its own entry point (`@optiaxiom/icons/IconTrashCan`) so
// consumers can skip loading the whole barrel. `scripts/download.mjs`
// generates one file per icon in `src/entries`.
const input = {
  index: "src/index.ts",
  ...Object.fromEntries(
    readdirSync("src/entries").map((file) => [
      basename(file, ".ts"),
      `src/entries/${file}`,
    ]),
  ),
};
writeExports(Object.keys(input));

/** @returns {import('rolldown').Plugin} */
function materialSymbolsPlugin() {
  const prefix = "\0material-symbol:";
  const materialIconId = "\0material-icon:";
  const materialIconPath = resolve("src/MaterialIcon.tsx");

  return {
    name: "material-symbols",

    resolveId(source, importer) {
      if (source === materialIconId) {
        return { id: materialIconPath };
      }
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
      const isFilled = basename(filePath).includes("-fill");

      const svgContent = readFileSync(filePath, "utf-8");
      const componentName = svgToComponentName(basename(filePath));
      const unfilledPath = parseSvgPath(svgContent);

      const fillFilePath = filePath.replace(/(-fill)?\.svg$/, "-fill.svg");
      const fillSvgContent = readFileSync(fillFilePath, "utf-8");
      const filledPath = parseSvgPath(fillSvgContent);

      return {
        code: `
import { createElement, forwardRef } from "react";
import { MaterialIcon } from "${materialIconId}";

const ${componentName} = forwardRef(
  function ${componentName}(props, ref) {
    return createElement(MaterialIcon, {
      ${isFilled && unfilledPath !== filledPath ? "filled: true," : ""}
      ${unfilledPath === filledPath ? "" : `filledPath: ${JSON.stringify(filledPath)},`}
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

function svgToComponentName(svgFileName) {
  const name = svgFileName.replace(/\.svg$/, "").replace(/-fill$/, "_fill");

  const pascal = name
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  return `Icon${pascal}`;
}

export default defineConfig([
  {
    external,
    input,
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
      {
        generateBundle() {
          this.emitFile({
            fileName: "MaterialIcon.css",
            source: readFileSync(resolve("src/MaterialIcon.css"), "utf-8"),
            type: "asset",
          });
        },
        name: "css",
        resolveId(id) {
          if (!id.endsWith(".css")) {
            return null;
          }
          return { external: true, id: `./${basename(id)}` };
        },
      },
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
    transform: {
      target: "esnext",
    },
  },
  {
    external,
    input,
    output: {
      dir: "dist",
      format: "es",
    },
    plugins: [
      {
        name: "css",
        resolveId(id) {
          if (id.endsWith(".css")) {
            return { external: true, id };
          }
          return null;
        },
      },
      {
        name: "svg-dts",
        resolveId(source, importer) {
          if (!source.endsWith(".svg") || !importer) {
            return null;
          }
          return { id: resolve(dirname(importer), source + ".d.ts") };
        },
      },
      dts({
        emitDtsOnly: true,
        generator: watch ? "tsc" : "tsgo",
        sourcemap: false,
        tsconfig: "tsconfig.build.json",
      }),
    ],
  },
]);

/**
 * Keeps `package.json#exports` in sync with the build inputs. CI fails if the
 * committed file differs from what the build writes.
 *
 * @param {string[]} names
 */
function writeExports(names) {
  const exports = Object.fromEntries(
    [
      ...names.map((name) => [
        name === "index" ? "." : `./${name}`,
        // `types` must stay the first condition for TypeScript to pick it up.
        Object.fromEntries([
          ["types", `./dist/${name}.d.ts`],
          ["import", `./dist/esm/${name}.js`],
          ["require", `./dist/cjs/${name}.js`],
        ]),
      ]),
      ["./package.json", "./package.json"],
    ].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)),
  );
  if (JSON.stringify(exports) === JSON.stringify(pkg.exports)) {
    return;
  }
  writeFileSync(
    "./package.json",
    JSON.stringify({ ...pkg, exports }, null, 2) + "\n",
  );
}
