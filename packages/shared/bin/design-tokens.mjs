import Table from "cli-table3";
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
  const tokens = {
    "Colors/Neutral/1200": {
      name: "Colors/Neutral/1200",
      type: "color",
      value: "#091e42",
    },
  };
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

  const warnings = [];

  /** @type {Record<string, { light: string, dark: string; variable?: string }>} */
  const colors = {
    "bg.information": { dark: "blue.50", light: "blue.50" },
    "bg.information.strong": { dark: "blue.600", light: "blue.600" },
    "bg.neutral.inverse.hovered": {
      dark: "neutral.200",
      light: "neutral.900",
    },
    "bg.overlay": { dark: "neutral.50/32", light: "neutral.1200/32" },
    "border.outline": { dark: "brand.300", light: "brand.300" },
    "fg.discovery": { dark: "purple.500", light: "purple.500" },
    "fg.information": { dark: "blue.500", light: "blue.500" },
    "fg.information.strong": { dark: "blue.700", light: "blue.700" },
  };
  /** @type {Record<string, string>} */
  const index = {};
  for (const token of Object.values(tokens)) {
    try {
      if (token.name.startsWith("Colors/")) {
        const name = normalizeColorName(token.name, token.value, index);
        colors[name] = { dark: token.value, light: token.value };
        index[token.value] = name;
      }
    } catch {
      warnings.push(token.name);
    }
  }
  for (const token of Object.values(tokens)) {
    try {
      if (token.name.startsWith("colors/")) {
        colors[normalizeColorName(token.name)] = {
          dark: index[tokensDark[token.name].value],
          light: index[token.value],
          variable: token.name,
        };
      }
    } catch {
      warnings.push(token.name);
    }
  }

  return /** @type {const} */ ([
    Object.entries(colors).sort(([a], [b]) => naturalSortComparator(a, b)),
    warnings,
  ]);
}

/**
 * light background/dark text
 * bg.{semantic} - bg.default, bg.page, bg.error
 *
 * dark background/light text
 * bg.{semantic}.strong - bg.error.strong, bg.warning.strong
 * bg.{semantic}.strong.{state} - bg.error.strong.hovered
 *
 * border.{semantic} - border.active, border.default, border.error
 * border.{semantic}.{state} - border.active.hovered
 *
 * fg.{semantic} - fg.default, fg.warning
 * fg.{state} - fg.disabled
 * fg.accent.{color} - fg.accent.red, fg.accent.primary
 * fg.accent.{color}.strong - fg.accent.red.strong, fg.accent.primary.strong
 * fg.inverse
 *
 * @type {Record<string, string>}
 */
const mapFigmaToNormalizedName = {
  "bg/accent/base": "bg.accent.strong",
  "bg/accent/light": "bg.accent.hovered",
  "bg/accent/states/base_hover": "bg.accent.strong.hovered",
  "bg/accent/states/base_pressed": "bg.accent.strong.pressed",
  "bg/accent/subtle": "bg.accent",
  "bg/contrast": "bg.neutral.inverse",
  "bg/default": "bg.default",
  "bg/disabled": "_bg.neutral.strong",
  "bg/disabled-muted": "_bg.neutral",
  "bg/feedback/error-base": "bg.error.strong",
  "bg/feedback/error-light": "bg.error.hovered",
  "bg/feedback/error-subtle": "bg.error",
  "bg/feedback/states/error-base-hover": "bg.error.strong.hovered",
  "bg/feedback/states/error-base-pressed": "bg.error.strong.pressed",
  "bg/feedback/states/success-base-hover": "bg.success.strong.hovered",
  "bg/feedback/states/warning-base-hover": "bg.warning.strong.hovered",
  "bg/feedback/success-base": "bg.success.strong",
  "bg/feedback/success-light": "bg.success.hovered",
  "bg/feedback/success-subtle": "bg.success",
  "bg/feedback/warning-base": "bg.warning.strong",
  "bg/feedback/warning-light": "bg.warning.hovered",
  "bg/feedback/warning-subtle": "bg.warning",
  "bg/page bg": "bg.page",
  "bg/secondary": "bg.neutral",
  "bg/states/default-hover": "_bg.neutral",
  "bg/states/default-pressed": "bg.neutral.hovered",
  "bg/states/secondary-hover": "bg.neutral.hovered",
  "bg/states/tertiary-hover": "bg.neutral.strong.hovered",
  "bg/tertiary": "bg.neutral.strong",
  "border/accent": "border.accent",
  "border/active": "border.active",
  "border/active_hover": "border.active.hovered",
  "border/default": "border.default",
  "border/default_hover": "border.default.hovered",
  "border/disabled": "border.disabled",
  "border/error": "border.error",
  "border/secondary": "border.secondary",
  "border/success": "border.success",
  "border/tertiary": "border.tertiary",
  "border/warning": "border.warning",
  "fg/accent/base": "fg.accent",
  "fg/accent/states/base-hover": "fg.accent.hovered",
  "fg/accent/strong": "fg.accent.strong",
  "fg/default": "fg.default",
  "fg/default_on-base": "fg.default.inverse",
  "fg/default_on-contrast": "fg.default.inverse",
  "fg/disabled": "fg.disabled",
  "fg/feedback/error-base": "fg.error",
  "fg/feedback/error-strong": "fg.error.strong",
  "fg/feedback/states/error-base-hover": "fg.error.hovered",
  "fg/feedback/states/success-base_hover": "fg.success.hovered",
  "fg/feedback/states/warning-base_hover": "fg.warning.hovered",
  "fg/feedback/success-base": "fg.success",
  "fg/feedback/success-strong": "fg.success.strong",
  "fg/feedback/warning-base": "fg.warning",
  "fg/feedback/warning-strong": "fg.warning.strong",
  "fg/placeholder": "fg.tertiary",
  "fg/secondary": "fg.secondary",
  "fg/tertiary": "fg.tertiary",
  "fg/white": "fg.default.inverse",
};

/**
 * @param {string} name
 * @param {string} [value]
 * @param {Record<string, string>=} [palette]
 */
function normalizeColorName(name, value, palette) {
  const isPalette = name.startsWith("Colors/");
  name = name.slice("Colors/".length);

  const isAlpha = name.startsWith("Neutral/Alpha/");
  if (isAlpha) {
    name = name.slice("Neutral/Alpha/".length);
  }

  if (isPalette) {
    if (isAlpha && value && palette) {
      const color = value.slice(0, -2);
      const colorToken = palette[color];
      const alpha = Math.round((100 * parseInt(value.slice(-2), 16)) / 256);
      return `${colorToken}/${alpha}`;
    } else {
      if (name.includes("Aqua blue")) {
        throw new Error("Invalid color");
      }
      return name
        .toLowerCase()
        .replace("light blue", "blue")
        .replace("primary", "brand")
        .replace("/", ".");
    }
  } else if (name in mapFigmaToNormalizedName) {
    return mapFigmaToNormalizedName[name];
  } else {
    throw new Error("Invalid color");
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
 * @param {string} name
 * @param {Record<string, string>} object
 * @param {{
 *   pre?: string;
 *   transform?: (value: string) => string;
 * }} options
 */
function toVariable(name, object, { pre, transform = (value) => value }) {
  return [
    `export const ${name} = {`,
    ...(pre ? [`  ${pre}\n`] : []),
    Object.values(
      Object.entries(object).reduce(
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
          .map(
            ([name, value]) =>
              /** @type {const} */ ([
                name,
                value.light,
                value.dark,
                value.variable,
              ]),
          )) {
          const parts = name.split(".");
          table.push(
            debug
              ? [
                  name,
                  parts[0],
                  parts[1],
                  name.includes("strong")
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
        console.log(
          toVariable(
            "colorPalette",
            Object.fromEntries(
              report
                .filter(([, value]) => value.light.startsWith("#"))
                .map(([name, value]) => [name, value.light]),
            ),
            {
              pre: [
                'current: "currentColor" as const,',
                '  transparent: "transparent" as const,',
              ].join("\n"),
              transform: (value) => `"${value.toUpperCase()}" as const`,
            },
          ),
        );
        console.log("");
        console.log(
          toVariable(
            "colors",
            Object.fromEntries(
              report
                .filter(([, value]) => !value.light.startsWith("#"))
                .map(([name, value]) => [name, value.light]),
            ),
            {
              pre: "...colorPalette,",
              transform: (value) => `colorPalette["${value}"]`,
            },
          ),
        );
        console.log("");
        console.log(
          toVariable(
            "colorsDark",
            Object.fromEntries(
              report
                .filter(([, value]) => !value.dark.startsWith("#"))
                .map(([name, value]) => [name, value.dark]),
            ),
            {
              pre: "...colorPalette,",
              transform: (value) => `colorPalette["${value}"]`,
            },
          ),
        );
      }
    },
  })
  .parse();
