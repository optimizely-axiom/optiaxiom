/** @type {import('@typescript-eslint/utils').TSESLint.RuleModule<string>} */
export default {
  create(context) {
    /**
     * Find the parent function/arrow function of a node
     * @param {import('@typescript-eslint/utils').TSESTree.Node} node
     * @returns {(import('@typescript-eslint/utils').TSESTree.FunctionDeclaration | import('@typescript-eslint/utils').TSESTree.FunctionExpression | import('@typescript-eslint/utils').TSESTree.ArrowFunctionExpression) | null}
     */
    function findParentFunction(node) {
      /** @type {import('@typescript-eslint/utils').TSESTree.Node | undefined} */
      let current = node;
      while (current) {
        if (
          current.type === "FunctionDeclaration" ||
          current.type === "FunctionExpression" ||
          current.type === "ArrowFunctionExpression"
        ) {
          return current;
        }
        current = current.parent;
      }
      return null;
    }

    /**
     * Check if a function parameter destructures className
     * @param {(import('@typescript-eslint/utils').TSESTree.FunctionDeclaration | import('@typescript-eslint/utils').TSESTree.FunctionExpression | import('@typescript-eslint/utils').TSESTree.ArrowFunctionExpression) | null} funcNode
     * @returns {boolean}
     */
    function hasClassNameInParams(funcNode) {
      if (!funcNode || !funcNode.params) {
        return false;
      }

      return funcNode.params.some((param) => {
        if (param.type === "ObjectPattern") {
          return param.properties.some(
            (prop) =>
              prop.type === "Property" &&
              prop.key.type === "Identifier" &&
              prop.key.name === "className",
          );
        }
        return false;
      });
    }

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
        const hasSpreadPropsWithClassName = node.parent.parent.attributes.find(
          (attr) =>
            attr.type === "JSXSpreadAttribute" &&
            attr.argument.type === "Identifier",
        );

        if (hasSpreadPropsWithClassName && !hasClassName) {
          // Check if the component function destructures className
          const destructuresClassName = hasClassNameInParams(
            findParentFunction(node),
          );

          // If className is NOT destructured, it's still in props and will override the recipe
          if (!destructuresClassName) {
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
};
