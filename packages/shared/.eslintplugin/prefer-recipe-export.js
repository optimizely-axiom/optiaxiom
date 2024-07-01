import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    /**
     * @type {import('@typescript-eslint/utils').TSESTree.ImportDeclaration}
     */
    let styleImportNode;

    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['ImportDeclaration']}
       */
      'ImportDeclaration[source.value="../vanilla-extract"]': (node) => {
        styleImportNode = node;
      },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > CallExpression:matches([callee.name="style"], [callee.name="styleVariants"])':
        (node) => {
          context.report({
            data: { method: "name" in node.callee && node.callee.name },
            fix: (fixer) => [
              fixer.insertTextBefore(node, "recipe({ base: "),
              fixer.insertTextAfter(node, "})"),
              ...(styleImportNode.specifiers.some(
                (specifier) =>
                  specifier.type === "ImportSpecifier" &&
                  specifier.imported.name === "recipe",
              )
                ? []
                : [
                    fixer.insertTextBefore(
                      styleImportNode.specifiers[0],
                      "recipe, ",
                    ),
                  ]),
            ],
            messageId: "preferRecipe",
            node,
          });
        },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      preferRecipe: `Please replace {{method}}() with recipe() as top-level export.

Our convention is to always expose recipes rather than directly exposing raw styles.`,
    },
    schema: [],
    type: "suggestion",
  },
});
