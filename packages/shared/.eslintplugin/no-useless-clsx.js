import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'CallExpression[callee.name="clsx"]': (node) => {
        if (node.arguments.length > 1) {
          return;
        }

        context.report({
          fix: (fixer) =>
            fixer.replaceText(
              node,
              context.sourceCode.getText(node.arguments[0]),
            ),
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
      expected:
        "Please remove redundant clsx calls with only a single argument",
    },
    schema: [],
    type: "suggestion",
  },
});
