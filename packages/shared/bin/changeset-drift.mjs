import { isCI } from "ci-info";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const execFileAsync = promisify(execFile);

/**
 * The published `@optiaxiom/mcp` package is *generated* at build time from
 * @optiaxiom/react, @optiaxiom/globals, and @optiaxiom/shared. Its consumer-
 * facing output can therefore change without anyone touching the mcp package, so
 * the changeset that bumps it is easy to forget.
 *
 * This tool hashes that generated output (per section) and compares the locally
 * built data against the **last published release on npm**. Comparing against
 * the release (rather than the PR base branch) means an unbumped change can't be
 * silenced by merging it once — the drift keeps being flagged until a release
 * actually ships the changeset.
 */
const PACKAGE_NAME = "@optiaxiom/mcp";

const SECTIONS = /** @type {const} */ ([
  "components",
  "guides",
  "icons",
  "tests",
  "tokens",
]);

/**
 * Read the set of package names that have a pending changeset in `.changeset/`.
 *
 * @returns {Promise<Set<string>>}
 */
async function changesetPackages() {
  const dir = resolve(process.cwd(), ".changeset");
  /** @type {Set<string>} */
  const packages = new Set();
  let files;
  try {
    files = await readdir(dir);
  } catch {
    return packages;
  }
  for (const file of files) {
    if (!file.endsWith(".md") || file === "README.md") {
      continue;
    }
    const content = await readFile(resolve(dir, file), { encoding: "utf-8" });
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatter) {
      continue;
    }
    for (const line of frontmatter[1].split("\n")) {
      const match = line.match(/^["']([^"']+)["']\s*:/);
      if (match) {
        packages.add(match[1]);
      }
    }
  }
  return packages;
}

/**
 * Hash each top-level section of the generated data independently so a drift
 * report can name which sections changed.
 *
 * @param {Record<string, unknown>} data
 * @returns {Record<string, string>}
 */
function digest(data) {
  /** @type {Record<string, string>} */
  const hashes = {};
  for (const section of SECTIONS) {
    hashes[section] = createHash("sha256")
      .update(JSON.stringify(data[section]))
      .digest("hex");
  }
  return hashes;
}

/**
 * Import the mcp data from a built package directory. Prefers the public
 * `./data` export and falls back to the internal data chunk so older releases
 * (published before the export existed) still work.
 *
 * @param {string} dir - Package root containing `dist/`.
 * @returns {Promise<Record<string, unknown>>}
 */
async function loadDataFrom(dir) {
  for (const rel of [
    "dist/src/data.js",
    "dist/_virtual/_virtual_mcp-data/index.js",
  ]) {
    try {
      return await import(`file://${join(dir, rel)}`);
    } catch {
      continue;
    }
  }
  throw new Error(`Could not load ${PACKAGE_NAME} data from ${dir}.`);
}

/**
 * Load the locally built data (this checkout's `packages/mcp`).
 *
 * @returns {Promise<Record<string, unknown>>}
 */
async function loadLocal() {
  return loadDataFrom(resolve(process.cwd(), "packages/mcp"));
}

/**
 * Download the last published release from npm and load its data.
 *
 * @returns {Promise<Record<string, unknown>>}
 */
async function loadPublished() {
  const dir = await mkdtemp(join(tmpdir(), "mcp-drift-"));
  try {
    const { stdout } = await execFileAsync(
      "npm",
      ["pack", PACKAGE_NAME, "--json"],
      { cwd: dir },
    );
    const filename = JSON.parse(stdout)[0].filename;
    await execFileAsync("tar", ["xzf", filename], { cwd: dir });
    return await loadDataFrom(join(dir, "package"));
  } finally {
    await rm(dir, { force: true, recursive: true });
  }
}

void yargs(hideBin(process.argv))
  .command({
    builder: {
      output: {
        choices: ["cli", "markdown"],
        default: isCI ? "markdown" : "cli",
      },
    },
    command: ["compare", "$0"],
    handler: async ({ output }) => {
      const [local, published] = await Promise.all([
        loadLocal(),
        loadPublished(),
      ]);
      const head = digest(local);
      const base = digest(published);
      const changed = SECTIONS.filter(
        (section) => base[section] !== head[section],
      );
      const hasChangeset = (await changesetPackages()).has(PACKAGE_NAME);
      const drifted = changed.length > 0;

      if (output === "markdown") {
        if (!drifted) {
          console.log(
            `## Generated package changeset check\n\n✅ \`${PACKAGE_NAME}\` output matches the last release — no changeset needed.`,
          );
        } else if (hasChangeset) {
          console.log(
            `## Generated package changeset check\n\n✅ \`${PACKAGE_NAME}\` output changed since the last release (${changed.join(", ")}) and a changeset is present.`,
          );
        } else {
          console.log(
            [
              "## Generated package changeset check",
              "",
              `⚠️ \`${PACKAGE_NAME}\` generated output changed since the last release but **no \`${PACKAGE_NAME}\` changeset was found**.`,
              "",
              "Its published `dist` is generated from `@optiaxiom/react`, `@optiaxiom/globals`, and `@optiaxiom/shared`, so this change reaches consumers without bumping its version. Please add a changeset:",
              "",
              "```sh",
              "pnpm changeset",
              "```",
              "",
              `Changed sections: ${changed.map((section) => `\`${section}\``).join(", ")}.`,
            ].join("\n"),
          );
        }
      } else if (!drifted) {
        console.log(`✓ ${PACKAGE_NAME}: matches last release`);
      } else if (hasChangeset) {
        console.log(
          `✓ ${PACKAGE_NAME}: changed since release (${changed.join(", ")}), changeset present`,
        );
      } else {
        console.log(
          `✗ ${PACKAGE_NAME}: changed since release (${changed.join(", ")}), NO changeset`,
        );
      }

      if (drifted && !hasChangeset) {
        process.exitCode = 1;
      }
    },
  })
  .parse();
