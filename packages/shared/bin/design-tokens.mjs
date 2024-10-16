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
    "Colors/Cyan/100": {
      name: "Colors/Cyan/100",
      type: "color",
      value: "#CFFAFE",
    },
    "Colors/Cyan/200": {
      name: "Colors/Cyan/200",
      type: "color",
      value: "#99F0F9",
    },
    "Colors/Cyan/700": {
      name: "Colors/Cyan/700",
      type: "color",
      value: "#0E7490",
    },
    "Colors/Cyan/900": {
      name: "Colors/Cyan/900",
      type: "color",
      value: "#083344",
    },
    "Colors/Magenta/200": {
      name: "Colors/Magenta/200",
      type: "color",
      value: "#F5D0FE",
    },
    "Colors/Magenta/900": {
      name: "Colors/Magenta/900",
      type: "color",
      value: "#4A044E",
    },
    "Colors/Neutral/300": {
      name: "Colors/Neutral/300",
      type: "color",
      value: "#B8BECB",
    },
    "Colors/Neutral/1200": {
      name: "Colors/Neutral/1200",
      type: "color",
      value: "#091e42",
    },
    "Colors/Purple/200": {
      name: "Colors/Purple/200",
      type: "color",
      value: "#C4B1E2",
    },
    "Colors/Purple/900": {
      name: "Colors/Purple/900",
      type: "color",
      value: "#261542",
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

  const mapCodeToFigmaName = Object.fromEntries(
    Object.entries(mapFigmaNameToCode).map(([k, v]) => [v, k]),
  );
  const warnings = [];

  /** @type {Record<string, { light: string, dark: string; variable?: string }>} */
  const colors = {
    "fg.warning.inverse": { dark: "neutral.800", light: "neutral.800" },
    "spinner.bg.default": { dark: "neutral.50", light: "neutral.1200" },
    "spinner.bg.inverse": { dark: "neutral.50", light: "neutral.50" },
  };
  /** @type {Record<string, string>} */
  const index = {};
  for (const token of Object.values(tokens)) {
    try {
      if (token.type === "color" && token.name.startsWith("Colors/")) {
        const name = normalizeColorName(token.name, token.value, index);
        colors[name] = { dark: token.value, light: token.value };
        index[token.value] = name;

        delete mapCodeToFigmaName[name];
      }
    } catch {
      warnings.push(token.name);
    }
  }
  for (const token of Object.values(tokens)) {
    try {
      if (token.type === "color" && !token.name.startsWith("Colors/")) {
        const name = normalizeColorName(token.name);
        colors[name] = {
          dark: index[tokensDark[token.name].value],
          light: index[token.value],
          variable: token.name,
        };
        delete mapCodeToFigmaName[name];
      }
    } catch {
      warnings.push(token.name);
    }
  }

  warnings.push(...Object.values(mapCodeToFigmaName));

  colors["avatar.bg.blue"].dark = "blue.500";
  colors["avatar.fg.blue"].light = "neutral.00";

  colors["avatar.bg.cyan"].light = "cyan.100";
  colors["avatar.bg.cyan"].dark = "cyan.900";
  colors["avatar.fg.cyan"].light = "cyan.700";
  colors["avatar.fg.cyan"].dark = "cyan.200";

  colors["avatar.bg.green"].dark = "green.900";
  colors["avatar.fg.green"].dark = "green.200";

  colors["avatar.bg.magenta"].dark = "magenta.900";
  colors["avatar.fg.magenta"].dark = "magenta.200";

  colors["avatar.bg.purple"].dark = "purple.900";
  colors["avatar.fg.purple"].dark = "purple.200";

  colors["avatar.bg.yellow"].dark = "yellow.900";
  colors["avatar.fg.yellow"].dark = "yellow.200";

  colors["bg.default.inverse.hovered"].dark = "neutral.200";
  colors["bg.default.inverse.pressed"].dark = "neutral.300";
  colors["bg.secondary.hovered"].light = "neutral.1200/8";

  colors["border.disabled"].light = "neutral.75";
  colors["border.disabled"].dark = "neutral.800";

  return /** @type {const} */ ([
    Object.entries(colors).sort(([a], [b]) => naturalSortComparator(a, b)),
    warnings,
  ]);
}

/**
 * @type {Record<string, string>}
 */
const mapFigmaNameToCode = {
  "avatar/bg/blue": "avatar.bg.blue",
  "avatar/bg/cyan": "avatar.bg.cyan",
  "avatar/bg/green": "avatar.bg.green",
  "avatar/bg/magenta": "avatar.bg.magenta",
  "avatar/bg/purple": "avatar.bg.purple",
  "avatar/bg/yellow": "avatar.bg.yellow",
  "avatar/fg/blue": "avatar.fg.blue",
  "avatar/fg/cyan": "avatar.fg.cyan",
  "avatar/fg/green": "avatar.fg.green",
  "avatar/fg/magenta": "avatar.fg.magenta",
  "avatar/fg/purple": "avatar.fg.purple",
  "avatar/fg/yellow": "avatar.fg.yellow",
  "bg/accent/base": "bg.accent",
  "bg/accent/light": "bg.accent.light",
  "bg/accent/states/base_hover": "bg.accent.hovered",
  "bg/accent/states/base_pressed": "bg.accent.pressed",
  "bg/accent/subtle": "bg.accent.subtle",
  "bg/default": "bg.default",
  "bg/default/inverse": "bg.default.inverse",
  "bg/default/inverse-hover": "bg.default.inverse.hovered",
  "bg/default/inverse-pressed": "bg.default.inverse.pressed",
  "bg/disabled": "_bg.tertiary",
  "bg/disabled-muted": "_bg.secondary",
  "bg/feedback/error-base": "bg.error",
  "bg/feedback/error-light": "bg.error.light",
  "bg/feedback/error-subtle": "bg.error.subtle",
  "bg/feedback/error-subtlest": "bg.error.subtlest",
  "bg/feedback/information-base": "bg.information",
  "bg/feedback/information-light": "bg.information.light",
  "bg/feedback/information-subtle": "bg.information.subtle",
  "bg/feedback/states/error-base-hover": "bg.error.hovered",
  "bg/feedback/states/error-base-pressed": "bg.error.pressed",
  "bg/feedback/states/success-base-hover": "bg.success.hovered",
  "bg/feedback/states/warning-base-hover": "bg.warning.hovered",
  "bg/feedback/success-base": "bg.success",
  "bg/feedback/success-light": "bg.success.light",
  "bg/feedback/success-subtle": "bg.success.subtle",
  "bg/feedback/warning-base": "bg.warning",
  "bg/feedback/warning-light": "bg.warning.light",
  "bg/feedback/warning-subtle": "bg.warning.subtle",
  "bg/overlay": "bg.overlay",
  "bg/page bg": "bg.page",
  "bg/secondary": "bg.secondary",
  "bg/states/default-hover": "_bg.secondary",
  "bg/states/default-pressed": "_bg.secondary.hovered",
  "bg/states/secondary-hover": "bg.secondary.hovered",
  "bg/states/tertiary-hover": "bg.tertiary.hovered",
  "bg/tertiary": "bg.tertiary",
  "border/accent": "border.accent",
  "border/active": "border.active",
  "border/active_hover": "border.active.hovered",
  "border/default": "border.default",
  "border/default_hover": "border.default.hovered",
  "border/disabled": "border.disabled",
  "border/error": "border.error",
  "border/focus": "border.focus",
  "border/secondary": "border.secondary",
  "border/success": "border.success",
  "border/tertiary": "border.tertiary",
  "border/warning": "border.warning",
  "fg/accent/base": "fg.accent",
  "fg/accent/base-hover": "fg.accent.hovered",
  "fg/accent/strong": "fg.accent.strong",
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
  "fg/placeholder": "fg.tertiary",
  "fg/secondary": "fg.secondary",
  "fg/tertiary": "fg.tertiary",
  "fg/white": "fg.white",
  "link/fg-default": "link.fg.default",
  "link/fg-default-hover": "link.fg.default.hovered",
  "link/fg-inverse": "link.fg.inverse",
  "link/fg-subtle": "link.fg.subtle",
  "link/fg-visited": "link.fg.visited",
  "spinner/default-bg": "_spinner.bg.default",
  "spinner/default-indicator": "spinner.fg.default",
  "spinner/inverse-bg": "_spinner.bg.inverse",
  "spinner/inverse-indicator": "spinner.fg.inverse",
};

/**
 * @param {string} name
 * @param {string} [value]
 * @param {Record<string, string>=} [palette]
 */
function normalizeColorName(name, value, palette) {
  const isPalette = name.startsWith("Colors/");
  if (name.startsWith("Colors/") || name.startsWith("colors/")) {
    name = name.slice("Colors/".length);
  }

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
      return name.toLowerCase().replace("primary", "brand").replace("/", ".");
    }
  } else if (name in mapFigmaNameToCode) {
    return mapFigmaNameToCode[name];
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
        console.log(
          toVariable(
            "colorPalette",
            Object.fromEntries(
              report
                .filter(([, value]) => value.light.startsWith("#"))
                .map(([name, value]) => [name, value.light]),
            ),
            {
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
              pre: [
                'current: "currentColor" as const,',
                '  transparent: "transparent" as const,',
              ].join("\n"),
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
              pre: [
                'current: "currentColor" as const,',
                '  transparent: "transparent" as const,',
              ].join("\n"),
              transform: (value) => `colorPalette["${value}"]`,
            },
          ),
        );
      }
    },
  })
  .parse();
