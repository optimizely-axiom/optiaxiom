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
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      string: "Please use string type for sprinkle values.",
    },
    schema: [],
    type: "suggestion",
  },
});
