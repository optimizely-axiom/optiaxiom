#!/usr/bin/env node
// Bumps the dependencies of private workspaces (the root, apps, shared), which
// never reach consumers, so the update needs no changeset. A package named in
// any published manifest is skipped everywhere: published builds externalize
// only dependencies and peers, so even their devDependencies ship in the
// bundle, and a private app shouldn't drift from what consumers get.
//
// Each remaining package moves as far as its spec in that manifest allows:
//   ^0.x / ~0.x  → `pnpm update --latest`: a caret on 0.x only admits patches,
//                  so 0.x tools would otherwise never move. This tracks latest,
//                  including the jump out of 0.x to 1+.
//   other ^ / ~  → `pnpm update`: minors and patches; a new major of a 1+
//                  package stays a deliberate human bump.
//   exact pins   → untouched: a pin means "don't move me".
// `npm:` aliases are classified by the range after the alias.
//
// Updates are lockfile-only so that a patched package whose patch no longer
// applies still gets bumped: the install that follows reports the patch.
//
// Usage: node packages/shared/bin/update-deps.mjs

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * @typedef {{
 *   dependencies?: Record<string, string>;
 *   devDependencies?: Record<string, string>;
 *   optionalDependencies?: Record<string, string>;
 *   peerDependencies?: Record<string, string>;
 *   private?: boolean;
 * }} Manifest
 */

/** @type {Array<{ dir: string; pkg: Manifest }>} */
const workspaces = JSON.parse(
  execFileSync("pnpm", ["ls", "-r", "--depth", "-1", "--json"], {
    encoding: "utf8",
  }),
).map((/** @type {{ path: string }} */ { path: dir }) => ({
  dir,
  pkg: JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8")),
}));

const published = new Set(
  workspaces
    .filter(({ pkg }) => !pkg.private)
    .flatMap(({ pkg }) => [
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
      ...Object.keys(pkg.optionalDependencies ?? {}),
      ...Object.keys(pkg.peerDependencies ?? {}),
    ]),
);

for (const { dir, pkg } of workspaces.filter(({ pkg }) => pkg.private)) {
  const zeroMajor = [];
  const ranged = [];
  for (const [name, spec] of Object.entries({
    ...pkg.dependencies,
    ...pkg.optionalDependencies,
    ...pkg.devDependencies,
  })) {
    if (published.has(name)) {
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
