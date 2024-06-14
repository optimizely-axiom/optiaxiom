import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['Property']}
       */
      'CallExpression:matches([callee.name="recipe"], [callee.name="style"]) Property[key.name="selectors"] > ObjectExpression > Property':
        (prop) => {
          const node = prop.key;
          if (node.type !== "Literal" || !node.raw.includes("[aria-")) {
            return;
          }

          const expected = node.raw.replaceAll("aria-", "data-");
          context.report({
            fix: (fixer) => fixer.replaceText(node, expected),
            messageId: "aria",
            node,
          });
        },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      aria: "Please use data-* attributes instead of aria-* attributes when writing CSS selectors.",
    },
    schema: [],
    type: "suggestion",
  },
});
