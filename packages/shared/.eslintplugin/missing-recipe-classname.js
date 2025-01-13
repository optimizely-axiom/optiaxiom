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

        const parserServices = ESLintUtils.getParserServices(context);
        const hasClassName = node.arguments.length === 2;
        const hasSpreadPropsWithClassName = node.parent.parent.attributes.find(
          (attr) =>
            attr.type === "JSXSpreadAttribute" &&
            attr.argument.type === "Identifier" &&
            parserServices
              .getTypeAtLocation(attr.argument)
              .getProperty("className"),
        );
        if (hasSpreadPropsWithClassName && !hasClassName) {
          const children = context.sourceCode
            .getScope(node)
            .variables.find((variable) => variable.name === "children")
            ?.defs[0].name;
          context.report({
            fix: (fixer) => [
              node.arguments.length === 1
                ? fixer.insertTextAfter(node.arguments[0], ", className")
                : fixer.insertTextAfterRange(
                    [node.range[0], node.range[1] - 1],
                    "{}, className",
                  ),
              ...(children
                ? [fixer.insertTextAfter(children, ", className")]
                : []),
            ],
            messageId: "recipe",
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
      recipe: "Did you forget to handle className in the recipe?",
    },
    schema: [],
    type: "suggestion",
  },
});
