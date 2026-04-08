import Table from "cli-table3";
import { writeFileSync } from "fs";
import { readFile } from "fs/promises";
import { resolve } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const naturalSortComparator = Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
}).compare;

/**
 * @param {string} file
 */
async function importTokens(file) {
  /**
   * @typedef {{
   *  name: string;
   *  value: string;
   * }} Token
   */
  /**
   * @type {Array<{
   *   name: string;
   *   values: Array<{
   *     mode: { name: string };
   *     color: Token[];
   *     number: Token[];
   *   }>;
   * }>}
   */
  const collections = JSON.parse(
    await readFile(resolve(process.cwd(), file), {
      encoding: "utf-8",
    }),
  );

  /** @type {Record<string, Token & { type: 'color' | 'number' }>} */
  const tokens = {};
  /** @type {Record<string, Token & { type: 'color' | 'number' }>} */
  const tokensDark = {};
  for (const collection of collections) {
    for (const values of collection.values) {
      for (const value of values.color) {
        if (values.mode.name.includes("Dark")) {
          tokensDark[value.name] = {
            ...value,
            type: "color",
          };
        } else {
          tokens[value.name] = {
            ...value,
            type: "color",
          };
        }
      }
      for (const value of values.number) {
        tokens[value.name] = {
          ...value,
          type: "number",
        };
      }
    }
  }

  const mapCodeToFigmaName = Object.fromEntries(
    Object.entries(mapFigmaNameToCode).map(([k, v]) => [v, k]),
  );
  const warnings = [];

  /** @type {Record<string, { light: string, dark: string; variable?: string }>} */
  const colors = {
    "bg.secondary.hovered": { dark: "neutral.50/18", light: "neutral.75" },
    "bg.spinner.default": { dark: "neutral.50", light: "neutral.1100" },
    "bg.spinner.inverse": { dark: "neutral.50", light: "neutral.50" },
    "bg.tertiary.hovered": { dark: "neutral.50/18", light: "neutral.200" },
    "border.accent": { dark: "brand.300", light: "brand.500" },
    "border.success": { dark: "green.500", light: "green.500" },
    "fg.warning.inverse": { dark: "neutral.800", light: "neutral.800" },
    "fg.white": { dark: "neutral.00", light: "neutral.00" },
  };
  /** @type {Record<string, string>} */
  const index = {};
  /** @type {Set<string>} */
  const paletteNames = new Set();
  for (const token of Object.values(tokens)) {
    try {
      if (
        token.type === "color" &&
        token.name.startsWith("Colors/") &&
        !token.name.includes(" Dark/")
      ) {
        const name = normalizeColorName(token.name);
        colors[name] = { dark: token.value, light: token.value };
        index[token.value.toLowerCase()] = name;
        paletteNames.add(name);
        delete mapCodeToFigmaName[name];
      }
    } catch {
      warnings.push(token.name);
    }
  }
  // Index dark palette values only if the normalized name exists in the light palette
  for (const token of Object.values(tokens)) {
    try {
      if (
        token.type === "color" &&
        token.name.startsWith("Colors/") &&
        token.name.includes(" Dark/")
      ) {
        const name = normalizeColorName(token.name);
        if (paletteNames.has(name)) {
          index[token.value.toLowerCase()] = name;
        }
      }
    } catch {
      // skip
    }
  }
  for (const token of Object.values(tokens)) {
    try {
      if (token.type === "color" && !token.name.startsWith("Colors/")) {
        const name = normalizeColorName(token.name);
        const lightValue =
          index[token.value.toLowerCase()] ??
          findClosestColor(token.value, index);
        const darkToken = tokensDark[token.name];
        const darkValue = darkToken
          ? (index[darkToken.value.toLowerCase()] ??
            findClosestColor(darkToken.value, index))
          : lightValue;
        colors[name] = {
          dark: darkValue,
          light: lightValue,
          variable: token.name,
        };
        delete mapCodeToFigmaName[name];
      }
    } catch {
      warnings.push(token.name);
    }
  }

  warnings.push(...Object.values(mapCodeToFigmaName));

  return /** @type {const} */ ([
    Object.entries(colors).sort(([a], [b]) => naturalSortComparator(a, b)),
    warnings,
  ]);
}

/**
 * @type {Record<string, string>}
 */
const mapFigmaNameToCode = {
  "bg/accent/base": "bg.accent",
  "bg/accent/base_hover": "bg.accent.hovered",
  "bg/accent/base_pressed": "bg.accent.pressed",
  "bg/accent/light": "bg.accent.light",
  "bg/accent/subtle": "bg.accent.subtle",
  "bg/default": "bg.default",
  "bg/default/inverse": "bg.default.inverse",
  "bg/default/inverse-hover": "bg.default.inverse.hovered",
  "bg/default/inverse-pressed": "bg.default.inverse.pressed",
  "bg/disabled": "_bg.tertiary",
  "bg/disabled-muted": "_bg.secondary",
  "bg/feedback/error-base": "bg.error",
  "bg/feedback/error-base-hover": "bg.error.hovered",
  "bg/feedback/error-base-pressed": "bg.error.pressed",
  "bg/feedback/error-light": "bg.error.light",
  "bg/feedback/error-subtle": "bg.error.subtle",
  "bg/feedback/error-subtlest": "bg.error.subtlest",
  "bg/feedback/information-base": "bg.information",
  "bg/feedback/information-light": "bg.information.light",
  "bg/feedback/information-subtle": "bg.information.subtle",
  "bg/feedback/success-base": "bg.success",
  "bg/feedback/success-base-hover": "bg.success.hovered",
  "bg/feedback/success-light": "bg.success.light",
  "bg/feedback/success-subtle": "bg.success.subtle",
  "bg/feedback/warning-base": "bg.warning",
  "bg/feedback/warning-base-hover": "bg.warning.hovered",
  "bg/feedback/warning-light": "bg.warning.light",
  "bg/feedback/warning-subtle": "bg.warning.subtle",
  "bg/overlay": "bg.overlay",
  "bg/page bg": "bg.page",
  "bg/secondary": "bg.secondary",
  "bg/states/default-hover": "bg.default.hovered",
  "bg/states/default-pressed": "bg.default.pressed",
  "bg/states/default-selected": "_bg.default.selected",
  "bg/tertiary": "bg.tertiary",
  "border/accent": "border.accent",
  "border/control": "border.control",
  "border/control_hover": "border.control.hovered",
  "border/default": "border.default",
  "border/default_hover": "_border.default.hovered",
  "border/disabled": "border.disabled",
  "border/error": "border.error",
  "border/focus-default": "border.focus",
  "border/focus-error": "border.focus.error",
  "border/light": "_border.light",
  "border/secondary": "border.secondary",
  "border/success": "border.success",
  "border/tertiary": "border.tertiary",
  "border/warning": "border.warning",
  "component/Avatar/bg-neutral": "bg.avatar.neutral",
  "component/Avatar/bg-purple": "bg.avatar.purple",
  "component/Avatar/fg-neutral": "fg.avatar.neutral",
  "component/Avatar/fg-purple": "fg.avatar.purple",
  "component/Link/disabled": "_fg.link.disabled",
  "component/Link/fg-default": "fg.link.default",
  "component/Link/fg-default-hover": "fg.link.default.hovered",
  "component/Link/inverse": "fg.link.inverse",
  "component/Link/inverse-visited": "_fg.link.inverse.visited",
  "component/Link/subtle": "fg.link.subtle",
  "component/Link/visited": "fg.link.visited",
  "component/Pill/bg-default": "_bg.pill.default",
  "component/Spinner/bg-default": "_bg.spinner.default",
  "component/Spinner/bg-inverse": "_bg.spinner.inverse",
  "component/Spinner/indicator-default": "fg.spinner.default",
  "component/Spinner/indicator-inverse": "fg.spinner.inverse",
  "component/Switch/bg-default": "_bg.switch.default",
  "component/Switch/bg-hover": "_bg.switch.hovered",
  "component/Table/bg": "_bg.table",
  "component/Table/bg-hover": "_bg.table.hovered",
  "component/Table/border": "_border.table",
  "fg/accent/base": "fg.accent",
  "fg/accent/base-hover": "fg.accent.hovered",
  "fg/accent/strong": "fg.accent.strong",
  "fg/dark": "_fg.dark",
  "fg/default": "fg.default",
  "fg/default-inverse": "fg.default.inverse",
  "fg/disabled": "fg.disabled",
  "fg/feedback/error-base": "fg.error",
  "fg/feedback/error-light": "fg.error.light",
  "fg/feedback/error-strong": "fg.error.strong",
  "fg/feedback/information-base": "fg.information",
  "fg/feedback/information-light": "fg.information.light",
  "fg/feedback/information-strong": "fg.information.strong",
  "fg/feedback/states/error-base-hover": "fg.error.hovered",
  "fg/feedback/states/success-base_hover": "fg.success.hovered",
  "fg/feedback/states/warning-base_hover": "fg.warning.hovered",
  "fg/feedback/success-base": "fg.success",
  "fg/feedback/success-light": "fg.success.light",
  "fg/feedback/success-strong": "fg.success.strong",
  "fg/feedback/warning-base": "fg.warning",
  "fg/feedback/warning-light": "fg.warning.light",
  "fg/feedback/warning-strong": "fg.warning.strong",
  "fg/light": "_fg.light",
  "fg/placeholder": "fg.tertiary",
  "fg/secondary": "fg.secondary",
  "fg/tertiary": "fg.tertiary",
  "fg/white": "fg.white",
};

/**
 * Find the closest palette color to a given hex value.
 * @param {string} hex
 * @param {Record<string, string>} index - maps hex values to palette names
 * @returns {string}
 */
function findClosestColor(hex, index) {
  const [r, g, b] = hexToRgb(hex);
  let bestName = "";
  let bestDist = Infinity;
  for (const [paletteHex, name] of Object.entries(index)) {
    // Skip alpha palette entries
    if (paletteHex.length > 7) continue;
    const [pr, pg, pb] = hexToRgb(paletteHex);
    const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestName = name;
    }
  }
  return bestName;
}

/**
 * @param {string} hex
 * @returns {[number, number, number]}
 */
function hexToRgb(hex) {
  hex = hex.replace("#", "").slice(0, 6);
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

/**
 * Mapping from new alpha primitive names to output palette names.
 * "dark" alphas are light-on-dark (neutral.50/*), "light" alphas are dark-on-light (neutral.1200/*).
 */
const mapAlphaToCode = {
  "dark 50": "neutral.50/6",
  "dark 75": "neutral.50/12",
  "dark 100": "neutral.50/18",
  "dark 150": "neutral.50/22",
  "dark 200": "neutral.50/32",
  "light 50": "neutral.1200/4",
  "light 75": "neutral.1200/8",
  "light 100": "neutral.1200/16",
  "light 150": "neutral.1200/22",
  "light 200": "neutral.1200/32",
};

/**
 * @param {string} name
 */
function normalizeColorName(name) {
  const isPalette = name.startsWith("Colors/");
  if (name.startsWith("Colors/") || name.startsWith("colors/")) {
    name = name.slice("Colors/".length);
  }

  const isAlpha = name.startsWith("Neutral/Alpha/");
  if (isAlpha) {
    const alphaKey = name.slice("Neutral/Alpha/".length);
    if (alphaKey in mapAlphaToCode) {
      return mapAlphaToCode[
        /** @type {keyof typeof mapAlphaToCode} */ (alphaKey)
      ];
    }
    throw new Error("Unknown alpha token: " + name);
  }

  if (isPalette) {
    // Strip parenthetical suffixes like "500 (LFGreen)" → "500"
    // and "Dark" palette suffixes like "Brand Dark/500" → skip
    const parts = name.split("/");
    if (parts.length === 2) {
      let [group, stop] = parts;
      // Skip "Dark" variant palettes — they share values with the light palette
      if (group.includes(" Dark")) {
        group = group.replace(" Dark", "");
      }
      stop = stop.replace(/\s*\(.*\)$/, "");
      return group.toLowerCase().replace("primary", "brand") + "." + stop;
    }
    throw new Error("Unexpected palette format: " + name);
  } else {
    // Semantic token — strip "colors/" prefix and handle suffixes
    if (name.startsWith("colors/")) {
      name = name.slice("colors/".length);
    }
    // Strip (?) and (deprecated) suffixes
    name = name.replace(/\s*\(\??\)$/, "").replace(/\s*\(deprecated\)$/, "");
    if (name in mapFigmaNameToCode) {
      return mapFigmaNameToCode[name];
    }
    throw new Error("Invalid color: " + name);
  }
}

/**
 * @param {Array<string[]>} rows
 * @returns
 */
function toCSV(rows) {
  return rows.map((row) => row.join(",")).join("\n");
}

/**
 * @param {Array<string[]>} rows
 * @returns
 */
function toTable(rows) {
  const table = new Table({ head: rows.shift() });
  for (const row of rows) {
    table.push(row);
  }
  return table.toString();
}

/**
 * @template T
 * @param {string} name
 * @param {Record<string, T>} object
 * @param {{
 *   exported?: boolean;
 *   pre?: string;
 *   transform?: (value: T) => string;
 * }} options
 */
function toVariable(
  name,
  object,
  { exported = true, pre, transform = (value) => String(value) },
) {
  return [
    `${exported ? "export " : ""}const ${name} = {`,
    ...(pre ? [`  ${pre}\n`] : []),
    Object.values(
      Object.entries(object)
        .filter(([name]) => !name.startsWith("_"))
        .reduce(
          (/** @type {Record<string, string[]>} */ result, [name, value]) => {
            const prefix = name.slice(
              0,
              name.indexOf(name.includes("/") ? "/" : "."),
            );
            (result[prefix] = result[prefix] || []).push(
              `  "${name}": ${transform(value)},`,
            );
            return result;
          },
          {},
        ),
    )
      .map((lines) => lines.join("\n"))
      .join("\n\n"),
    "} as const;",
  ].join("\n");
}

void yargs(hideBin(process.argv))
  .command({
    builder: {
      debug: { type: "boolean" },
      output: {
        choices: ["cli", "csv", "code"],
        default: "cli",
      },
    },
    command: ["import <file>", "$0 <file>"],
    handler: async ({ debug, file, output }) => {
      const [report, warnings] = await importTokens(file);

      if (warnings.length) {
        console.warn("\x1b[33mCould not normalize colors:\x1b[0m");
        for (const item of warnings) {
          console.log(" -", item);
        }
        console.log("");
      }

      if (output === "cli" || output === "csv") {
        const renderer = output === "cli" ? toTable : toCSV;

        const tablePalette = [["Name", "Value"]];
        for (const [name, value] of report
          .filter(([, value]) => value.light.startsWith("#"))
          .map(([name, value]) => [name, value.light])) {
          tablePalette.push([name, value]);
        }
        console.log(renderer(tablePalette));

        const table = [
          debug
            ? [
                "Name",
                "Property",
                "Semantic",
                "Modifier",
                "State",
                "Contrast",
                "Light",
                "Dark",
                "Figma",
              ]
            : ["Name", "Light", "Dark"],
        ];
        for (const [name, light, dark, variable] of report
          .filter(([, value]) => !value.light.startsWith("#"))
          .map(([name, value]) => /** @type {const} */ ([
            name,
            value.light,
            value.dark,
            value.variable,
          ]))) {
          const parts = name.split(".");
          table.push(
            debug
              ? [
                  name,
                  parts[0],
                  parts[1],
                  name.includes("light")
                    ? "light"
                    : name.includes("strong")
                      ? "strong"
                      : name.includes("subtle")
                        ? "subtle"
                        : "",
                  ["hovered", "pressed"].includes(parts.at(-1) ?? "")
                    ? (parts.at(-1) ?? "")
                    : "",
                  name.includes("inverse") ? "inverse" : "",
                  light,
                  dark,
                  variable ?? "",
                ]
              : [name, light, dark],
          );
        }
        console.log(renderer(table));
      } else {
        const blocks = [
          toVariable(
            "palette",
            Object.fromEntries(
              report
                .filter(([, value]) => value.light.startsWith("#"))
                .map(([name, value]) => [name, value.light]),
            ),
            {
              exported: false,
              transform: (value) => `"${value.toUpperCase()}" as const`,
            },
          ),
          "const ld = <A extends string, B extends string>(a: A, b: B) => `light-dark(${a}, ${b})` as const;",
          toVariable(
            "colors",
            Object.fromEntries(
              report
                .filter(([, value]) => !value.light.startsWith("#"))
                .map(([name, value]) => [
                  name,
                  { dark: value.dark, light: value.light },
                ]),
            ),
            {
              transform: (value) =>
                `ld(palette["${value.light}"], palette["${value.dark}"])`,
            },
          ),
        ];

        const file = "packages/globals/src/tokens/colors.ts";
        console.warn(
          "\x1b[34mWriting output to file:\x1b[0m",
          `\x1b[32m${file}\x1b[0m`,
        );
        writeFileSync(file, blocks.join("\n\n") + "\n");
      }
    },
  })
  .parse();
