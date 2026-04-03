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
 */
/** @param {string} source */
function svgToComponentName(source) {
  const match = source.match(/^@material-symbols\/svg-\d+\/\w+\/(.+)\.svg$/);
  if (!match) {
    return null;
  }

  const name = match[1].replace(/-fill$/, "");

  const pascal = name
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  return `Icon${pascal}`;
}

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
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
      },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      mismatch:
        'Icon export name "{{ got }}" does not match SVG source. Expected "{{ expected }}".',
      wrongStyle: 'Icon must use "rounded" style, but found "{{ got }}".',
      wrongWeight: 'Icon must use weight "300", but found "{{ got }}".',
    },
    schema: [],
    type: "problem",
  },
});
