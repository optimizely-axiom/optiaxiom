import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['ImportDeclaration']}
       */
      "ImportDeclaration[source.value=/\\.css$/]": (node) => {
        if (node.specifiers.length === 0) {
          return;
        }

        if (
          node.specifiers.length > 1 ||
          node.specifiers[0].local.name !== "styles"
        ) {
          context.report({
            fix: (fixer) => [
              fixer.replaceText(
                node,
                `import * as styles from "${node.source.value}";`,
              ),
              ...context.sourceCode
                .getDeclaredVariables(node)
                .flatMap((variable) =>
                  variable.references.map((ref) =>
                    fixer.insertTextBefore(ref.identifier, "styles."),
                  ),
                ),
            ],
            messageId: "import",
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
      import: "Please use single namespace import called `styles`.",
    },
    schema: [],
    type: "suggestion",
  },
});
