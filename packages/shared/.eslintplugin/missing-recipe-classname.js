import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['JSXSpreadAttribute']}
       */
      'JSXSpreadAttribute[argument.name="sprinkleProps"]': (node) => {
        if (node.parent.type !== "JSXOpeningElement") {
          return;
        }
        const hasClassName = node.parent.attributes.find(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "className",
        );
        const hasRecipe = node.parent.attributes.find(
          (attr) =>
            attr.type === "JSXSpreadAttribute" &&
            attr.argument.type === "CallExpression" &&
            attr.argument.callee.type === "MemberExpression" &&
            attr.argument.callee.object.type === "Identifier" &&
            attr.argument.callee.object.name === "styles",
        );
        if (!hasClassName && !hasRecipe) {
          const children = context.sourceCode
            .getScope(node)
            .variables.find((variable) => variable.name === "children")
            ?.defs[0].name;
          context.report({
            fix: (fixer) => [
              fixer.insertTextAfter(node.parent.name, " className={className}"),
              ...(children
                ? [fixer.insertTextAfter(children, ", className")]
                : []),
            ],
            messageId: "sprinkles",
            node,
          });
        }
      },

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
            (attr.argument.name === "props" ||
              attr.argument.name === "sprinkleProps"),
        );
        if (hasSpreadProps && !hasClassName) {
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
      sprinkles: "Please include className when spreading sprinkle props.",
    },
    schema: [],
    type: "suggestion",
  },
});
