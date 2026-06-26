import { isCI } from "ci-info";
import { readdir, readFile } from "fs/promises";
import { resolve } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * Packages whose published output is *generated* from other source (react,
 * globals, shared, …) rather than written by hand. A PR can change their output
 * transitively without touching the package — so the changeset that bumps them
 * is easy to forget. Each entry knows how to produce a deterministic snapshot of
 * its generated output so we can diff base-vs-PR.
 *
 * @type {Array<{ name: string; snapshot: () => Promise<Record<string, unknown>> }>}
 */
const derivedPackages = [
  {
    name: "@optiaxiom/mcp",
    async snapshot() {
      // Imported via a non-literal specifier so the typechecker does not pull
      // generators.mjs (a sibling project) into this package's program.
      const specifier = "../../mcp/plugins/generators.mjs";
      const {
        generateComponents,
        generateGuides,
        generateIcons,
        generateTests,
        generateTokens,
      } = await import(specifier);
      return {
        components: await generateComponents(),
        guides: await generateGuides(),
        icons: await generateIcons(),
        tests: await generateTests(),
        tokens: await generateTokens(),
      };
    },
  },
];

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
 * @param {Awaited<ReturnType<typeof compare>>} reports
 */
function cliReporter(reports) {
  for (const report of reports) {
    if (!report.drifted) {
      console.log(`✓ ${report.name}: no output change`);
    } else if (report.hasChangeset) {
      console.log(`✓ ${report.name}: output changed, changeset present`);
    } else {
      console.log(
        `✗ ${report.name}: output changed, NO changeset (${Object.keys(report.sections).join(", ")})`,
      );
    }
  }
}

/**
 * @param {{ file: string }} options
 */
async function compare({ file }) {
  const base = JSON.parse(
    await readFile(resolve(process.cwd(), file), { encoding: "utf-8" }),
  );
  const head = await snapshot();
  const changesets = await changesetPackages();

  return derivedPackages.map((pkg) => {
    const baseData = base[pkg.name] ?? {};
    const headData = head[pkg.name] ?? {};
    /** @type {Record<string, ReturnType<typeof diffSection>>} */
    const sections = {};
    for (const section of new Set([
      ...Object.keys(baseData),
      ...Object.keys(headData),
    ])) {
      const diff = diffSection(baseData[section], headData[section]);
      if (diff.added.length || diff.removed.length || diff.changed.length) {
        sections[section] = diff;
      }
    }
    return {
      drifted: Object.keys(sections).length > 0,
      hasChangeset: changesets.has(pkg.name),
      name: pkg.name,
      sections,
    };
  });
}

/**
 * Summarise the difference between two generated sections (each a keyed object).
 *
 * @param {unknown} baseSection
 * @param {unknown} headSection
 */
function diffSection(baseSection, headSection) {
  const base = /** @type {Record<string, unknown>} */ (baseSection ?? {});
  const head = /** @type {Record<string, unknown>} */ (headSection ?? {});
  const baseKeys = Object.keys(base);
  const headKeys = Object.keys(head);
  const added = headKeys.filter((key) => !baseKeys.includes(key));
  const removed = baseKeys.filter((key) => !headKeys.includes(key));
  const changed = headKeys.filter(
    (key) =>
      baseKeys.includes(key) &&
      JSON.stringify(base[key]) !== JSON.stringify(head[key]),
  );
  return { added, changed, removed };
}

/**
 * @param {Awaited<ReturnType<typeof compare>>} reports
 */
function markdownReporter(reports) {
  const lines = ["## Generated package changeset check", ""];

  const drifted = reports.filter((report) => report.drifted);
  if (drifted.length === 0) {
    lines.push(
      "✅ No generated package output changed — no extra changesets needed.",
    );
    console.log(lines.join("\n"));
    return;
  }

  for (const report of reports) {
    if (!report.drifted) {
      continue;
    }

    const summary = Object.entries(report.sections)
      .map(([section, diff]) => {
        const parts = [];
        if (diff.added.length) {
          parts.push(`+${diff.added.length}`);
        }
        if (diff.removed.length) {
          parts.push(`-${diff.removed.length}`);
        }
        if (diff.changed.length) {
          parts.push(`~${diff.changed.length}`);
        }
        return `\`${section}\` (${parts.join(" ")})`;
      })
      .join(", ");

    if (report.hasChangeset) {
      lines.push(
        `✅ \`${report.name}\` output changed and a changeset is present — ${summary}.`,
      );
    } else {
      lines.push(
        `⚠️ \`${report.name}\` generated output changed but **no \`${report.name}\` changeset was found**.`,
        "",
        `Its published \`dist\` is generated from other packages, so this PR changes what consumers receive without bumping its version. Please add a changeset:`,
        "",
        "```sh",
        "pnpm changeset",
        "```",
        "",
        `Changed sections: ${summary} _(+added / -removed / ~changed entries)_.`,
      );

      for (const [section, diff] of Object.entries(report.sections)) {
        const total =
          diff.added.length + diff.removed.length + diff.changed.length;
        const examples = [
          ...diff.added.map((key) => `+${key}`),
          ...diff.removed.map((key) => `-${key}`),
          ...diff.changed.map((key) => `~${key}`),
        ]
          .slice(0, 10)
          .join(", ");
        lines.push(`- **${section}**: ${examples}${total > 10 ? ", …" : ""}`);
      }
    }
    lines.push("");
  }

  console.log(lines.join("\n").trimEnd());
}

/**
 * Build a deterministic snapshot of every derived package's generated output.
 *
 * @returns {Promise<Record<string, Record<string, unknown>>>}
 */
async function snapshot() {
  /** @type {Record<string, Record<string, unknown>>} */
  const result = {};
  for (const pkg of derivedPackages) {
    result[pkg.name] = /** @type {Record<string, unknown>} */ (
      sortKeysDeep(await pkg.snapshot())
    );
  }
  return result;
}

/**
 * Recursively sort object keys so JSON.stringify is stable regardless of the
 * insertion order the generators happen to use.
 *
 * @param {unknown} value
 * @returns {unknown}
 */
function sortKeysDeep(value) {
  if (Array.isArray(value)) {
    return value.map(sortKeysDeep);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sortKeysDeep(/** @type {any} */ (value)[key])]),
    );
  }
  return value;
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
      const reports = await compare({ file: /** @type {string} */ (file) });
      if (output === "markdown") {
        markdownReporter(reports);
      } else {
        cliReporter(reports);
      }
      if (reports.some((report) => report.drifted && !report.hasChangeset)) {
        process.exitCode = 1;
      }
    },
  })
  .command({
    command: ["snapshot", "$0"],
    handler: async () => {
      console.log(JSON.stringify(await snapshot()));
    },
  })
  .parse();
