// TurboSnap picks the stories to snapshot by tracing each file a commit
// changed through preview-stats.json. Storybook bundles the workspace packages
// from their git-ignored dist, so a change under packages/*/src traces to no
// story. This adds each dist module's source file as a dependency of that
// module. Run after `storybook build --stats-json`.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const storybook = resolve(import.meta.dirname, "..");
const file = join(storybook, "storybook-static/preview-stats.json");
// Stats name each module relative to apps/storybook.
const prefix = "./../../";
const repo = (path) => join(storybook, prefix, path);

const stats = JSON.parse(readFileSync(file, "utf8"));
const known = new Map(stats.modules.map((module) => [module.name, module]));
const added = new Map();
const untraced = [];
/** @type {Map<string, string[]>} */
const sourceFilesCache = new Map();

for (const { name } of stats.modules) {
  const match = name.match(
    /^\.\/\.\.\/\.\.\/packages\/([^/]+)\/dist\/esm\/(.+)$/,
  );
  if (!match) {
    continue;
  }

  const source = findSource(match[1], match[2]);
  if (!source) {
    untraced.push(name);
    continue;
  }

  const sourceName = prefix + source;
  if (!added.has(sourceName)) {
    added.set(
      sourceName,
      known.get(sourceName) ?? { id: sourceName, name: sourceName, reasons: [] },
    );
  }
  added.get(sourceName).reasons.push({ moduleName: name });
}

stats.modules.push(
  ...[...added.values()].filter((module) => !known.has(module.name)),
);
writeFileSync(file, JSON.stringify(stats));

console.log(`Traced ${added.size} workspace source files.`);
if (untraced.length) {
  // Not fatal: mostly third-party code bundled into dist, whose changes come
  // through the lockfile and make TurboSnap snapshot every story. Build inputs
  // outside src are listed as externals in .github/workflows/visual.yml.
  console.log(`No source found for:\n  ${untraced.join("\n  ")}`);
}

/**
 * @param {string} pkg
 * @param {string} path the module path under `dist/esm`
 */
function findSource(pkg, path) {
  // Virtual modules embed their source as an absolute path:
  // `_virtual/_material-symbol_/<repo>/packages/icons/svg/add.svg.js`
  const virtual = path.match(/^_virtual\/.*\/(packages\/.+)\.js$/);
  if (virtual) {
    return existsSync(repo(virtual[1])) ? virtual[1] : undefined;
  }

  const src = `packages/${pkg}/src/`;
  // `ButtonGroup-css.js` is `ButtonGroup.css.ts`
  const stem = path
    .replace(`packages/${pkg}/src/`, "")
    .replace(/-css\.js$/, ".css")
    .replace(/\.js$/, "");
  for (const candidate of [
    `${stem}.ts`,
    `${stem}.tsx`,
    `${stem}/index.ts`,
    `${stem}/index.tsx`,
    stem,
  ]) {
    if (existsSync(repo(src + candidate))) {
      return src + candidate;
    }
  }

  // Modules emitted outside the source layout: `assets/x.css.ts.vanilla-<hash>.css`
  // for vanilla-extract styles, `IconPlus.js` for `entries/IconPlus.ts`.
  const file = basename(stem).replace(/\.vanilla-[\w-]+\.css$/, "");
  const matches = sourceFiles(pkg).filter((candidate) =>
    [`${file}.ts`, `${file}.tsx`, file].includes(basename(candidate)),
  );
  return matches.length === 1 ? matches[0] : undefined;
}

/**
 * @param {string} pkg
 */
function sourceFiles(pkg) {
  if (!sourceFilesCache.has(pkg)) {
    const dir = `packages/${pkg}/src`;
    sourceFilesCache.set(
      pkg,
      existsSync(repo(dir))
        ? readdirSync(repo(dir), { recursive: true }).map((entry) =>
            join(dir, entry),
          )
        : [],
    );
  }
  return sourceFilesCache.get(pkg);
}
