import { isCI } from "ci-info";
import Table from "cli-table3";
import esbuild from "esbuild";
import { readFile } from "fs/promises";
import { basename, parse, resolve } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const pkg = JSON.parse(await readFile("./package.json", { encoding: "utf-8" }));

async function compare({ file }) {
  const localReport = await measure({ json: true });
  const remoteReport = JSON.parse(
    await readFile(resolve(process.cwd(), "../../", file), {
      encoding: "utf-8",
    }),
  );
  const { compareResultsInReports } = await import(
    "monosize/src/utils/compareResultsInReports.mjs"
  );
  return compareResultsInReports(
    localReport.map((value) => ({
      ...value,
      packageName: basename(pkg.name),
      path: value.name,
    })),
    remoteReport.map((value) => ({
      ...value,
      packageName: basename(pkg.name),
      path: value.name,
    })),
  );
}

async function measure({ json }) {
  const { gzipSize } = await import("gzip-size");
  const { default: prettyBytes } = await import("pretty-bytes");

  const config = {
    alias: { [pkg.name]: process.cwd() },
    bundle: true,
    external: Object.keys(pkg.peerDependencies),
    format: "esm",
    loader: { ".woff2": "empty" },
    outdir: "dist",
    write: false,
  };

  const bundle = await esbuild.build({
    ...config,
    entryPoints: [pkg.name],
    format: "esm",
    metafile: true,
  });
  const imports = [
    "*",
    ...Object.values(bundle.metafile.outputs)[0].exports.sort(),
  ];

  const result = await esbuild.build({
    ...config,
    entryPoints: imports.reduce((result, name) => {
      result[name] = `fixture/${name}.js`;
      return result;
    }, {}),
    minify: true,
    plugins: [
      {
        name: "fixture",
        setup(build) {
          build.onResolve({ filter: /^fixture\/(\w+|\*)\.js$/ }, (args) => {
            return { namespace: "fixture", path: args.path };
          });
          build.onLoad({ filter: /.*/, namespace: "fixture" }, (args) => {
            const name = parse(args.path).name;
            return {
              contents:
                name === "*"
                  ? `import * as pkg from "${pkg.name}"; console.log(pkg)`
                  : `import { ${name} } from "${pkg.name}"; console.log(${name});`,
            };
          });
        },
      },
    ],
  });

  if (json) {
    const data = [];
    for (const outputFile of result.outputFiles) {
      data.push({
        gzippedSize: await gzipSize(outputFile.contents),
        minifiedSize: outputFile.contents.length,
        name: basename(outputFile.path),
      });
    }
    return data;
  } else {
    const table = new Table({
      colAligns: ["left", "right", "right"],
      head: ["Export", "Minified size", "GZIP size"],
    });
    for (const outputFile of result.outputFiles) {
      table.push([
        basename(outputFile.path),
        prettyBytes(outputFile.contents.length),
        prettyBytes(await gzipSize(outputFile.contents)),
      ]);
    }
    return table;
  }
}

yargs(hideBin(process.argv))
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
      if (output === "cli") {
        const { cliReporter } = await import(
          "monosize/src/reporters/cliReporter.mjs"
        );
        cliReporter(report);
      } else {
        const { markdownReporter } = await import(
          "monosize/src/reporters/markdownReporter.mjs"
        );
        markdownReporter(
          report,
          "main",
          `https://github.com/${process.env.GITHUB_REPOSITORY}`,
        );
      }
    },
  })
  .command({
    builder: { json: { boolean: true, default: isCI } },
    command: ["measure", "$0"],
    handler: async ({ json }) => {
      const result = await measure({ json });
      console.log(json ? JSON.stringify(result) : result.toString());
    },
  })
  .parse();
