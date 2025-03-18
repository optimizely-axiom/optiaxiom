import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['ImportDeclaration']}
       */
      'ImportDeclaration:matches([source.value="@testing-library/dom"], [source.value="@testing-library/react"], [source.value="@testing-library/user-event"])':
        (node) => {
          context.report({
            fix: (fixer) =>
              fixer.replaceText(node.source, '"../../vitest.rtl"'),
            messageId: "common",
            node: node.source,
          });
        },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      common: "Please import modules from `vitest.rtl` instead.",
    },
    schema: [],
    type: "suggestion",
  },
});
