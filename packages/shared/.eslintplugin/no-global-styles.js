import { ESLintUtils } from "@typescript-eslint/utils";
import path from "node:path";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['ImportSpecifier']}
       */
      [`ImportDeclaration:matches(${[
        `[source.value="@vanilla-extract/css"]`,
        `[source.value="@vanilla-extract/recipes"]`,
      ].join(", ")}) ImportSpecifier:matches(${[
        `[local.name="globalStyle"]`,
        `[local.name="style"]`,
      ].join(", ")})`]: (node) => {
        const parent = node.parent;
        if (parent.type !== "ImportDeclaration") {
          return;
        }

        context.report({
          fix: (fixer) =>
            fixer.replaceText(
              parent.source,
              `"${path.relative(
                path.dirname(context.filename),
                path.join(process.cwd(), "packages/react/src/vanilla-extract"),
              )}"`,
            ),
          messageId: "import",
          node,
        });
      },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      import: "Please import modules from `vanilla-extract` instead.",
    },
    schema: [],
    type: "suggestion",
  },
});
