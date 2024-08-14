import { isCI } from "ci-info";
import Table from "cli-table3";
import esbuild from "esbuild";
import { readFile } from "fs/promises";
import { basename, parse, resolve } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const packages = ["packages/react", "packages/web-components"];

/**
 * @param {{ file: string }} options
 */
async function compare({ file }) {
  const localReport = await measure();
  /**
   * @type {Array<{
   *    gzippedSize: number;
   *    minifiedSize: number;
   *    name: string;
   *    packageName: string;
   * }>}
   */
  const remoteReport = JSON.parse(
    await readFile(resolve(process.cwd(), file), {
      encoding: "utf-8",
    }),
  );
  const { compareResultsInReports } = await import(
    "monosize/src/utils/compareResultsInReports.mjs"
  );
  return compareResultsInReports(
    localReport.map((value) => ({
      ...value,
      path: value.name,
    })),
    remoteReport.map((value) => ({
      ...value,
      path: value.name,
    })),
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
      outdir: "dist",
      write: false,
    });

    const imports = (
      await Promise.all(
        Object.keys(pkg.exports).map(async (exportPath) => {
          const exportedItems = Object.values(
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
            .filter((name) => name !== "default")
            .map((name) => [name, `fixture/${exportPath}/${name}.js`]);
          return exportedItems.length === 1
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

    const typesSize = await readFile(resolve(packagePath, pkg.types));
    data.push({
      gzippedSize: await gzipSize(typesSize),
      minifiedSize: typesSize.length,
      name: basename(pkg.types),
      packageName: basename(pkg.name),
    });

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

void yargs(hideBin(process.argv))
  .command({
    builder: {
      output: {
        choices: ["cli", "markdown"],
        default: isCI ? "markdown" : "cli",
      },
    },
    command: "compare <file>",
    handler: async ({ file, output }) => {
      const report = await compare({ file });
      const reporter =
        output === "cli"
          ? (await import("monosize/src/reporters/cliReporter.mjs")).cliReporter
          : (await import("monosize/src/reporters/markdownReporter.mjs"))
              .markdownReporter;
      reporter(report, {
        commitSHA: `${process.env.GITHUB_SHA}`,
        deltaFormat: "delta",
        repository: `https://github.com/${process.env.GITHUB_REPOSITORY}`,
        showUnchanged: true,
      });
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
        const { default: prettyBytes } = await import("pretty-bytes");
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
