import { isCI } from "ci-info";
import Table from "cli-table3";
import esbuild from "esbuild";
import { access, readFile } from "fs/promises";
import { basename, parse, resolve } from "path";
import prettyBytes from "pretty-bytes";
import { styleText } from "util";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const commitSHA = `${process.env.GITHUB_SHA}`;
const repository = `https://github.com/${process.env.GITHUB_REPOSITORY}`;

const packages = [
  "packages/globals",
  "packages/icons",
  "packages/proteus",
  "packages/react",
  "packages/web-components",
];

/**
 * @param {string} file
 * @returns {Promise<Array<{
 *    gzippedSize: number;
 *    minifiedSize: number;
 *    name: string;
 *    packageName: string;
 * }>>}
 */
const readReport = async (file) =>
  JSON.parse(
    await readFile(resolve(process.cwd(), file), {
      encoding: "utf-8",
    }),
  );

/**
 * Pairs each head entry with its base entry and drops changes under 50
 * bytes. Entries only in the base report are not listed.
 *
 * @param {{ file: string; head?: string }} options
 */
async function compare({ file, head }) {
  const headReport = head ? await readReport(head) : await measure();
  const baseReport = new Map(
    (await readReport(file)).map((entry) => [
      `${entry.packageName}/${entry.name}`,
      entry,
    ]),
  );
  return headReport
    .map((entry) => {
      const base = baseReport.get(`${entry.packageName}/${entry.name}`);
      if (!base) {
        return {
          ...entry,
          base,
          gzippedDelta: 0,
          minifiedDelta: 0,
          overThreshold: false,
        };
      }
      const minifiedDelta = entry.minifiedSize - base.minifiedSize;
      return {
        ...entry,
        base,
        gzippedDelta: entry.gzippedSize - base.gzippedSize,
        minifiedDelta,
        // A zero-byte baseline has no meaningful percentage, so it never trips.
        overThreshold:
          base.minifiedSize > 0 &&
          minifiedDelta > 0 &&
          minifiedDelta / base.minifiedSize >= 0.1,
      };
    })
    .filter((entry) => !entry.base || Math.abs(entry.minifiedDelta) >= 50)
    .sort(
      (a, b) =>
        a.packageName.localeCompare(b.packageName) ||
        a.name.localeCompare(b.name),
    );
}

async function measure() {
  const { gzipSize } = await import("gzip-size");

  const data = [];

  for (const packagePath of packages) {
    const pkg = JSON.parse(
      await readFile(`${packagePath}/package.json`, { encoding: "utf-8" }),
    );

    const config = /** @type {const} */ ({
      absWorkingDir: resolve(packagePath),
      bundle: true,
      external: Object.keys(pkg.peerDependencies ?? {}),
      format: "esm",
      loader: { ".woff2": "empty" },
      logLevel: "error",
      outdir: "dist",
      tsconfig: (await access(`${packagePath}/tsconfig.build.json`)
        .then(() => true)
        .catch(() => false))
        ? "tsconfig.build.json"
        : undefined,
      write: false,
    });

    /** @param {string} exportPath */
    const getExports = async (exportPath) =>
      Object.values(
        (
          await esbuild.build({
            ...config,
            entryPoints: [exportPath.replace(".", pkg.name)],
            format: "esm",
            metafile: true,
          })
        ).metafile.outputs,
      )[0]
        .exports.sort()
        .filter((name) => name !== "default");
    const rootExports = new Set(pkg.exports["."] ? await getExports(".") : []);

    const imports = (
      await Promise.all(
        Object.keys(pkg.exports)
          .filter((exportPath) => exportPath !== "./package.json")
          .map(async (exportPath) => {
            const names = await getExports(exportPath);
            const exportedItems = names.map((name) => [
              name,
              `fixture/${exportPath}/${name}.js`,
            ]);
            // A subpath that only re-exports root exports (e.g. `./avatar`)
            // gets no aggregate row: its name would collide with the
            // `Avatar` row, since esbuild compares output paths
            // case-insensitively.
            const subset =
              exportPath !== "." &&
              names.every((name) => rootExports.has(name));
            return exportedItems.length === 1 || subset
              ? exportedItems
              : [
                  [
                    exportPath === "." ? "*" : exportPath,
                    `fixture/${exportPath}/*.js`,
                  ],
                  ...exportedItems,
                ];
          }),
      )
    ).flat();

    const result = await esbuild.build({
      ...config,
      entryPoints: Object.fromEntries(imports),
      minify: true,
      plugins: [
        {
          name: "fixture",
          setup(build) {
            build.onResolve({ filter: /^fixture\/(.+)\.js$/ }, (args) => {
              return { namespace: "fixture", path: args.path };
            });
            build.onLoad({ filter: /.*/, namespace: "fixture" }, (args) => {
              const { dir, name } = parse(args.path.slice("fixture/".length));
              return {
                contents:
                  name === "*"
                    ? `import * as pkg from "${dir.replace(".", pkg.name)}"; console.log(pkg)`
                    : `import { ${name} } from "${dir.replace(".", pkg.name)}"; console.log(${name});`,
                resolveDir: resolve(packagePath),
              };
            });
          },
        },
      ],
    });

    if (pkg.types) {
      const typesSize = await readFile(resolve(packagePath, pkg.types));
      data.push({
        gzippedSize: await gzipSize(typesSize),
        minifiedSize: typesSize.length,
        name: basename(pkg.types),
        packageName: basename(pkg.name),
      });
    }

    for (const outputFile of result.outputFiles) {
      data.push({
        gzippedSize: await gzipSize(outputFile.text),
        minifiedSize: outputFile.text.length,
        name: basename(outputFile.path),
        packageName: basename(pkg.name),
      });
    }
  }

  return data;
}

/** @param {number} value */
const formatBytes = (value) => prettyBytes(value, { maximumFractionDigits: 3 });

/**
 * @param {number} delta
 * @param {(delta: number) => string} format
 */
const formatDelta = (delta, format) => (delta === 0 ? "" : format(delta));

/** @param {Awaited<ReturnType<typeof compare>>} report */
function printCli(report) {
  if (report.length === 0) {
    console.log(styleText("green", "[✔]"), "No changes found");
    return;
  }

  /** @param {number} delta */
  const delta = (delta) =>
    styleText(
      delta > 0 ? "red" : "green",
      formatBytes(delta) + (delta > 0 ? "↑" : "↓"),
    );
  const table = new Table({
    colAligns: ["left", "right", "right"],
    head: ["Fixture", "Before", "After (minified/GZIP)"],
  });
  for (const entry of report) {
    table.push([
      [
        styleText("bold", entry.packageName),
        entry.name + (entry.base ? "" : styleText("cyan", " (new)")),
        ...(entry.overThreshold
          ? [styleText("red", `(${styleText("bold", "!")} over threshold)`)]
          : []),
      ].join("\n"),
      entry.base
        ? `${formatBytes(entry.base.minifiedSize)}\n${formatBytes(entry.base.gzippedSize)}`
        : "N/A\nN/A",
      `${formatDelta(entry.minifiedDelta, delta)} ${formatBytes(entry.minifiedSize)}\n` +
        `${formatDelta(entry.gzippedDelta, delta)} ${formatBytes(entry.gzippedSize)}`,
    ]);
  }
  console.log(table.toString());
  console.log();
  console.log(
    `🤖 This report was generated against '${repository}/commit/${commitSHA}'`,
  );
}

/** @param {Awaited<ReturnType<typeof compare>>} report */
function printMarkdown(report) {
  const output = ["## 📊 Bundle size report", ""];
  if (report.length === 0) {
    output.push("✅ No changes found");
    console.log(output.join("\n"));
    return;
  }

  /** @param {number} minified @param {number} gzipped */
  const sizes = (minified, gzipped) =>
    `\`${formatBytes(minified)}\`<br />\`${formatBytes(gzipped)}\``;
  /** @param {number} delta */
  const delta = (delta) =>
    `\`${formatBytes(delta)}\` ${delta > 0 ? "🔴" : "🟢"}`;
  output.push(
    "| Package & Exports | Baseline (minified/GZIP) | PR | Change |",
    "| :--- | ---: | ---: | ---: |",
  );
  for (const entry of report) {
    const name = [
      `<samp>${entry.packageName}</samp>`,
      entry.name,
      ...(entry.overThreshold ? ["⚠️ over threshold"] : []),
    ].join(" <br /> ");
    const before = sizes(
      entry.base?.minifiedSize ?? 0,
      entry.base?.gzippedSize ?? 0,
    );
    const after = sizes(entry.minifiedSize, entry.gzippedSize);
    const change = entry.base
      ? `${formatDelta(entry.minifiedDelta, delta)}<br />${formatDelta(entry.gzippedDelta, delta)}`
      : "🆕 New entry";
    output.push(`| ${name} | ${before} | ${after} | ${change} |`);
  }
  output.push(
    "",
    `<sub>🤖 This report was generated against <a href='${repository}/commit/${commitSHA}'>${commitSHA}</a></sub>`,
  );
  console.log(output.join("\n"));
}

void yargs(hideBin(process.argv))
  .command({
    builder: {
      head: {
        description: "Compare against this report instead of measuring",
        string: true,
      },
      output: {
        choices: ["cli", "markdown"],
        default: isCI ? "markdown" : "cli",
      },
    },
    command: "compare <file>",
    handler: async ({ file, head, output }) => {
      const report = await compare({ file, head });
      if (output === "cli") {
        printCli(report);
      } else {
        printMarkdown(report);
      }
    },
  })
  .command({
    builder: { json: { boolean: true, default: isCI } },
    command: ["measure", "$0"],
    handler: async ({ json }) => {
      const result = await measure();
      if (json) {
        console.log(JSON.stringify(result));
      } else {
        const table = new Table({
          colAligns: ["left", "right", "right"],
          head: ["Export", "Minified size", "GZIP size"],
        });
        for (const entry of result) {
          table.push([
            `${entry.packageName}/${basename(entry.name)}`,
            prettyBytes(entry.minifiedSize),
            prettyBytes(entry.gzippedSize),
          ]);
        }
        console.log(table.toString());
      }
    },
  })
  .parse();
