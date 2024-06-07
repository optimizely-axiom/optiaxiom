import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['Literal']}
       */
      'CallExpression[callee.name="defineProperties"] Property[key.name="properties"] > ObjectExpression > Property > ObjectExpression > Property > Literal':
        (node) => {
          if (node.type !== "Literal") {
            return;
          }
          if (typeof node.value === "string") {
            return;
          }

          context.report({
            fix: (fixer) => [
              fixer.insertTextBefore(node, '"'),
              fixer.insertTextAfter(node, '"'),
            ],
            messageId: "string",
            node,
          });
        },

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
            messageId: "const",
            node,
          });
        },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['Property']}
       */
      'CallExpression[callee.name="recipe"] Property[key.name="defaultVariants"]':
        (node) => {
          context.report({
            messageId: "defaultVariants",
            node,
          });
        },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      const: "Please cast arrays using `as const`.",
      defaultVariants: `Please specify defaults within the component prop types instead.

Otherwise there is a mismatch between the component logic and the styling logic.`,
      string: "Please use string type for sprinkle values.",
    },
    schema: [],
    type: "suggestion",
  },
});
