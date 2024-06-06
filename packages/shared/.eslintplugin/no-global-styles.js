import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['ImportDeclaration']}
       */
      [`ImportDeclaration:matches(${[
        `[source.value="@vanilla-extract/css"]`,
        `[source.value="@vanilla-extract/recipes"]`,
      ].join(", ")})`]: (node) => {
        context.report({
          fix: (fixer) =>
            fixer.replaceText(node.source, '"../vanilla-extract"'),
          messageId: "import",
          node: node.source,
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
