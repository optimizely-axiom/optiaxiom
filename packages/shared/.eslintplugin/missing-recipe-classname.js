import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'JSXSpreadAttribute > CallExpression[callee.object.name="styles"]': (
        node,
      ) => {
        if (node.parent.type !== "JSXSpreadAttribute") {
          return;
        }
        if (node.parent.parent.type !== "JSXOpeningElement") {
          return;
        }
        const hasClassName = node.arguments.length === 2;
        const hasSpreadProps = node.parent.parent.attributes.find(
          (attr) =>
            attr.type === "JSXSpreadAttribute" &&
            attr.argument.type === "Identifier" &&
            attr.argument.name === "props",
        );
        if (hasSpreadProps && !hasClassName) {
          context.report({
            fix: (fixer) =>
              node.arguments.length === 1
                ? fixer.insertTextAfter(node.arguments[0], ", className")
                : fixer.insertTextAfterRange(
                    [node.range[0], node.range[1] - 1],
                    "{}, className",
                  ),
            messageId: "expected",
            node,
          });
        }
      },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      expected: "Did you forget to handle className in the recipe?",
    },
    schema: [],
    type: "suggestion",
  },
});
