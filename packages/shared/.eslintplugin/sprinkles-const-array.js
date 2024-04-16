/** @type {import('eslint').Rule.RuleModule} */
export default {
  create(context) {
    return {
      /**
       * @type {import('eslint').Rule.RuleListener['ArrayExpression']}
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

  meta: {
    fixable: "code",
    messages: {
      expected: "Please cast arrays using `as const`.",
    },
    schema: [],
    type: "suggestion",
  },
};
