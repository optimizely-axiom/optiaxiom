import { ESLintUtils } from "@typescript-eslint/utils";

/** @param {string} source */
function parseSvgSource(source) {
  return source.match(
    /^@material-symbols\/svg-(?<weight>\d+)\/(?<style>\w+)\/(?<name>.+)\.svg$/,
  )?.groups;
}

/**
 * Convert an SVG file name (without extension) to the expected export name.
 *
 * - `add.svg` → `IconAdd`
 * - `add_box.svg` → `IconAddBox`
 * - `add_box-fill.svg` → `IconAddBoxFilled`
 */
/** @param {string} source */
function svgToComponentName(source) {
  const match = source.match(/^@material-symbols\/svg-\d+\/\w+\/(.+)\.svg$/);
  if (!match) {
    return null;
  }

  const name = match[1];
  const filled = name.endsWith("-fill");
  const base = filled ? name.replace(/-fill$/, "") : name;

  const pascal = base
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  return `Icon${pascal}${filled ? "Filled" : ""}`;
}

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    /** @type {Map<string, import("@typescript-eslint/utils").TSESTree.ExportNamedDeclaration>} */
    const exports = new Map();

    return {
      ExportNamedDeclaration(node) {
        if (
          !node.source ||
          node.source.type !== "Literal" ||
          typeof node.source.value !== "string" ||
          !node.source.value.startsWith("@material-symbols/")
        ) {
          return;
        }

        const source = node.source.value;
        const parsed = parseSvgSource(source);
        if (!parsed) {
          return;
        }

        if (parsed.weight !== "300") {
          context.report({
            data: { got: parsed.weight },
            messageId: "wrongWeight",
            node: node.source,
          });
        }

        if (parsed.style !== "rounded") {
          context.report({
            data: { got: parsed.style },
            messageId: "wrongStyle",
            node: node.source,
          });
        }

        const expected = svgToComponentName(source);
        if (!expected) {
          return;
        }

        for (const specifier of node.specifiers) {
          const exported =
            specifier.exported.type === "Identifier"
              ? specifier.exported.name
              : specifier.exported.value;

          if (exported !== expected) {
            context.report({
              data: { expected, got: exported },
              fix: (fixer) => {
                if (specifier.local.range[0] === specifier.exported.range[0]) {
                  return fixer.replaceText(specifier, expected);
                }
                return fixer.replaceText(specifier.exported, expected);
              },
              messageId: "mismatch",
              node: specifier,
            });
          }
        }

        const baseName = parsed.name.replace(/-fill$/, "");
        exports.set(source, node);

        if (parsed.name.endsWith("-fill")) {
          const outlinedSource = source.replace(
            `${parsed.name}.svg`,
            `${baseName}.svg`,
          );
          if (!exports.has(outlinedSource)) {
            exports.set(`pending:${outlinedSource}`, node);
          }
        } else {
          const filledSource = source.replace(
            `${parsed.name}.svg`,
            `${baseName}-fill.svg`,
          );
          if (!exports.has(filledSource)) {
            exports.set(`pending:${filledSource}`, node);
          }
        }
      },

      "Program:exit"() {
        for (const [key, node] of exports) {
          if (!key.startsWith("pending:")) {
            continue;
          }

          const source = key.slice("pending:".length);
          if (exports.has(source)) {
            continue;
          }

          const isFilled = source.endsWith("-fill.svg");
          context.report({
            data: {
              missing: isFilled ? "filled" : "outlined",
              source,
            },
            messageId: "missingVariant",
            node,
          });
        }
      },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      mismatch:
        'Icon export name "{{ got }}" does not match SVG source. Expected "{{ expected }}".',
      missingVariant:
        'Missing {{ missing }} variant. Expected an export from "{{ source }}".',
      wrongStyle: 'Icon must use "rounded" style, but found "{{ got }}".',
      wrongWeight: 'Icon must use weight "300", but found "{{ got }}".',
    },
    schema: [],
    type: "problem",
  },
});
