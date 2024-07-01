import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['MemberExpression']}
       */
      'JSXSpreadAttribute > MemberExpression[object.name="styles"]': (node) => {
        context.report({
          fix: (fixer) => fixer.insertTextAfter(node, "()"),
          messageId: "expected",
          node,
        });
      },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      expected: "Did you forget to call the recipe method?",
    },
    schema: [],
    type: "suggestion",
  },
});
