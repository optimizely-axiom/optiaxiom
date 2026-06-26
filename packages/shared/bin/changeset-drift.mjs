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

// @optiaxiom/mcp's published data is generated from other packages, so it can
// drift without anyone touching it. Hash the local build against the last npm
// release (not the PR base — that would let one merge silence the warning).
const PACKAGE_NAME = "@optiaxiom/mcp";

/** @returns {Promise<Set<string>>} Package names with a pending changeset. */
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
 * Hash each section separately so the report can name what changed. Sections
 * are derived from the data itself, so a new section is covered automatically.
 *
 * @param {Record<string, unknown>} data
 * @returns {Record<string, string>}
 */
function digest(data) {
  /** @type {Record<string, string>} */
  const hashes = {};
  for (const section of Object.keys(data).sort()) {
    hashes[section] = createHash("sha256")
      .update(JSON.stringify(data[section]))
      .digest("hex");
  }
  return hashes;
}

/**
 * Import a package's `./data` export from its install root, honoring its own
 * exports map. Returns null if the package predates the export.
 *
 * @param {string} root - Directory containing the package's `package.json`.
 * @returns {Promise<Record<string, unknown> | null>}
 */
async function loadDataExport(root) {
  const pkg = JSON.parse(
    await readFile(join(root, "package.json"), { encoding: "utf-8" }),
  );
  const entry = pkg.exports?.["./data"]?.import ?? pkg.exports?.["./data"];
  return entry ? import(`file://${join(root, entry)}`) : null;
}

/** @returns {Promise<Record<string, unknown> | null>} This checkout's data. */
async function loadLocal() {
  return loadDataExport(resolve(process.cwd(), "packages/mcp"));
}

/**
 * Install the last published release into a temp dir and import its `./data`
 * export. Returns null if that release predates the export.
 *
 * @returns {Promise<Record<string, unknown> | null>}
 */
async function loadPublished() {
  const dir = await mkdtemp(join(tmpdir(), "mcp-drift-"));
  try {
    await execFileAsync("npm", ["install", PACKAGE_NAME, "--prefix", dir], {
      cwd: dir,
    });
    return await loadDataExport(join(dir, "node_modules", PACKAGE_NAME));
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
      if (!local || !published) {
        console.log(
          `Skipping changeset drift check — ${PACKAGE_NAME} \`./data\` export is unavailable (build the package, or the published release predates it).`,
        );
        return;
      }
      const head = digest(local);
      const base = digest(published);
      const changed = [...new Set([...Object.keys(base), ...Object.keys(head)])]
        .sort()
        .filter((section) => base[section] !== head[section]);
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
