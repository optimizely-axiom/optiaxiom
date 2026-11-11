#!/usr/bin/env node
// Bumps the dependencies of every workspace. Each package moves as far as its
// spec in that manifest allows:
//   ^0.x / ~0.x  → `pnpm update --latest`: a caret on 0.x only admits patches,
//                  so 0.x packages would otherwise never move. This tracks
//                  latest, including the jump out of 0.x to 1+.
//   other ^ / ~  → `pnpm update`: minors and patches; a new major of a 1+
//                  package stays a deliberate human bump.
//   exact pins   → untouched: a pin means "don't move me". The report lists
//                  pins with a newer release instead, for a human to evaluate
//                  (see "Pinned dependencies" in packages/react/README.md).
// `npm:` aliases are classified by the range after the alias. Peer dependency
// ranges are a contract with consumers and never move.
//
// Published builds externalize only dependencies and peers, so even their
// devDependencies ship in the bundle: the script writes a patch changeset for
// each published package whose shipped dependencies moved.
//
// Updates are lockfile-only so that a patched package whose patch no longer
// applies still gets bumped: the install that follows reports the patch.
//
// Usage: node packages/shared/bin/update-deps.mjs [--report <file>]

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Packages left alone even within their range.
 */
const held = new Set(["@module-federation/enhanced"]);

/**
 * @typedef {{
 *   dependencies?: Record<string, string>;
 *   devDependencies?: Record<string, string>;
 *   name: string;
 *   optionalDependencies?: Record<string, string>;
 *   peerDependencies?: Record<string, string>;
 *   private?: boolean;
 * }} Manifest
 */

const args = process.argv.slice(2);
const reportIndex = args.indexOf("--report");
const report = reportIndex === -1 ? undefined : args[reportIndex + 1];

/** @type {Array<{ dir: string; pkg: Manifest }>} */
const workspaces = JSON.parse(
  execFileSync("pnpm", ["ls", "-r", "--depth", "-1", "--json"], {
    encoding: "utf8",
  }),
).map((/** @type {{ path: string }} */ { path: dir }) => ({
  dir,
  pkg: JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8")),
}));
const publishedWorkspaces = workspaces.filter(({ pkg }) => !pkg.private);

if (report) {
  writeFileSync(report, pinReport());
}

for (const { dir, pkg } of workspaces) {
  const zeroMajor = [];
  const ranged = [];
  for (const [name, spec] of Object.entries({
    ...pkg.dependencies,
    ...pkg.optionalDependencies,
    ...pkg.devDependencies,
  })) {
    if (held.has(name)) {
      continue;
    }
    const range = spec.replace(/^npm:.+@/, "");
    if (/^[\^~]0\./.test(range)) {
      zeroMajor.push(name);
    } else if (/^[\^~]/.test(range)) {
      ranged.push(name);
    }
  }

  // Run from the workspace's own directory so only its manifest moves. Guard
  // each pass: `pnpm update` with no names updates everything.
  for (const [names, flags] of /** @type {const} */ ([
    [zeroMajor, ["--latest"]],
    [ranged, []],
  ])) {
    if (names.length) {
      execFileSync("pnpm", ["update", "--lockfile-only", ...flags, ...names], {
        cwd: dir,
        stdio: "inherit",
      });
    }
  }
}

writeChangeset();

/**
 * Lists exact pins and held packages in published manifests that have a
 * newer release, as Markdown.
 */
function pinReport() {
  /** @type {Record<string, { current: string; latest: string }>} */
  let outdated;
  try {
    outdated = JSON.parse(
      execFileSync("pnpm", ["outdated", "-r", "--format", "json"], {
        encoding: "utf8",
      }),
    );
  } catch (error) {
    // `pnpm outdated` exits 1 when anything is outdated, with the JSON still
    // on stdout. Any other failure must not pass for an empty report.
    const { status, stdout } =
      /** @type {{ status: number; stdout: string }} */ (error);
    if (status !== 1 || !stdout) {
      throw error;
    }
    outdated = JSON.parse(stdout);
  }

  /** @type {Map<string, { latest: string; specs: Set<string>; usedBy: Set<string> }>} */
  const rowsByName = new Map();
  for (const { pkg } of publishedWorkspaces) {
    for (const [name, spec] of Object.entries({
      ...pkg.dependencies,
      ...pkg.devDependencies,
    })) {
      const info = outdated[name];
      if (
        !info ||
        info.current === info.latest ||
        !(/^\d/.test(spec) || held.has(name))
      ) {
        continue;
      }
      const row = rowsByName.get(name) ?? {
        latest: info.latest,
        specs: new Set(),
        usedBy: new Set(),
      };
      row.specs.add(spec);
      row.usedBy.add(pkg.name.replace("@optiaxiom/", ""));
      rowsByName.set(name, row);
    }
  }
  const rows = [...rowsByName]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([name, { latest, specs, usedBy }]) =>
        `| \`${name}\` | ${[...specs].join(", ")} | ${latest} | ${[...usedBy].join(", ")} |`,
    );

  return rows.length
    ? [
        "## Pinned or held, with a newer release",
        "",
        'Not bumped. Check each against "Pinned dependencies" in `packages/react/README.md` before moving it by hand.',
        "",
        "| Package | Spec | Latest | Used by |",
        "| --- | --- | --- | --- |",
        ...rows,
        "",
      ].join("\n")
    : "";
}

/**
 * Writes a patch changeset for each published package whose shipped
 * dependencies moved. Type packages never ship, and a package's own peers stay
 * external even when kept as devDependencies. web-components bundles react and
 * globals, so it moves with them. The file is named by time so it never
 * overwrites an unreleased changeset from an earlier run.
 */
function writeChangeset() {
  /**
   * @param {Manifest} before
   * @param {Manifest} after
   */
  const shipped = (before, after) =>
    /** @type {const} */ ([
      "dependencies",
      "optionalDependencies",
      "devDependencies",
    ]).some((field) =>
      Object.entries(after[field] ?? {}).some(
        ([name, spec]) =>
          before[field]?.[name] !== spec &&
          !(
            field === "devDependencies" &&
            (name.startsWith("@types/") ||
              name in (after.peerDependencies ?? {}))
          ),
      ),
    );

  const moved = new Set(
    publishedWorkspaces
      .filter(({ dir, pkg }) =>
        shipped(
          pkg,
          JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8")),
        ),
      )
      .map(({ pkg }) => pkg.name),
  );
  if (moved.has("@optiaxiom/react") || moved.has("@optiaxiom/globals")) {
    moved.add("@optiaxiom/web-components");
  }
  if (!moved.size) {
    return;
  }

  const time = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
  writeFileSync(
    `.changeset/deps-${time}.md`,
    [
      "---",
      ...[...moved].sort().map((name) => `"${name}": patch`),
      "---",
      "",
      "updated dependencies to their latest compatible versions",
      "",
    ].join("\n"),
  );
}
