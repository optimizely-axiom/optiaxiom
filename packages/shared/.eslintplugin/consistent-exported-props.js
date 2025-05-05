import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    /**
     * @type {import('@typescript-eslint/utils').TSESTree.TSTypeAliasDeclaration}
     */
    let exportedPropTypes;
    /**
     * @type {import('@typescript-eslint/utils').TSESTree.TSTypeAliasDeclaration}
     */
    let propTypes;

    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['TSTypeAliasDeclaration']}
       */
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration[id.name=/Props$/]":
        (node) => {
          exportedPropTypes = node;
        },
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['AssignmentExpression']}
       */
      'Program > ExpressionStatement > AssignmentExpression[left.type="MemberExpression"][left.object.type="Identifier"][left.property.name="displayName"][right.type="Literal"]':
        (node) => {
          if (
            node.left.type !== "MemberExpression" ||
            node.left.object.type !== "Identifier" ||
            node.right.type !== "Literal"
          ) {
            return;
          }

          const component = node.left.object.name;
          if (
            exportedPropTypes &&
            exportedPropTypes.id.name !== `${component}Props`
          ) {
            context.report({
              messageId: "naming",
              node: exportedPropTypes.id,
            });
          } else if (propTypes?.id.name === `${component}Props`) {
            context.report({
              fix: (fixer) => fixer.insertTextBefore(propTypes, "export "),
              messageId: "export",
              node: propTypes.id,
            });
          }
        },
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['TSTypeAliasDeclaration']}
       */
      "Program > TSTypeAliasDeclaration[id.name=/Props$/]": (node) => {
        propTypes = node;
      },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      export: "Please export component prop types",
      naming: "Please prefix the prop type name with the component name",
    },
    schema: [],
    type: "suggestion",
  },
});
