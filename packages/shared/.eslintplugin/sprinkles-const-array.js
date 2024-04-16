import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['ArrayExpression']}
       */
      'CallExpression[callee.name="defineProperties"] Property[key.name="properties"] ArrayExpression':
        (node) => {
          if (node.parent.type === "TSAsExpression") {
            return;
          }

          context.report({
            fix: (fixer) => fixer.insertTextAfter(node, " as const"),
            messageId: "expected",
            node: node,
          });
        },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      expected: "Please cast arrays using `as const`.",
    },
    schema: [],
    type: "suggestion",
  },
});
