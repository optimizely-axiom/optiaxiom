import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    /**
     *
     * @param {import('@typescript-eslint/utils').TSESTree.ObjectExpression} rule
     */
    function process(rule) {
      const varsType = checker.getTypeAtLocation(
        parserServices.esTreeNodeToTSNodeMap.get(rule),
      );
      const unscoped = varsType
        .getProperties()
        .some((prop) => prop.getEscapedName() !== "@layer");
      if (unscoped) {
        context.report({
          fix: (fixer) => [
            fixer.insertTextBefore(rule, '{ "@layer": { [layers.axiom]: '),
            fixer.insertTextAfter(rule, "} }"),
          ],
          messageId: "expected",
          node: rule,
        });
      }
    }

    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'CallExpression:matches([callee.name="recipe"])': (node) => {
        const args = node.arguments;
        const config = args[0];
        if (config.type !== "ObjectExpression") {
          return;
        }
        const rules = [
          ...config.properties.flatMap((prop) =>
            prop.type === "Property" &&
            prop.key.type === "Identifier" &&
            prop.key.name === "base"
              ? [prop.value]
              : [],
          ),
          ...config.properties.flatMap((prop) =>
            prop.type === "Property" &&
            prop.key.type === "Identifier" &&
            prop.key.name === "compoundVariants" &&
            prop.value.type === "ArrayExpression"
              ? prop.value.elements.flatMap((compoundVariant) =>
                  compoundVariant?.type === "ObjectExpression"
                    ? compoundVariant.properties.flatMap((prop) =>
                        prop.type === "Property" &&
                        prop.key.type === "Identifier" &&
                        prop.key.name === "style"
                          ? [prop.value]
                          : [],
                      )
                    : [],
                )
              : [],
          ),
          ...config.properties.flatMap((prop) =>
            prop.type === "Property" &&
            prop.key.type === "Identifier" &&
            prop.key.name === "variants" &&
            prop.value.type === "ObjectExpression"
              ? prop.value.properties.flatMap((variantGroup) =>
                  variantGroup.type === "Property" &&
                  variantGroup.value.type === "ObjectExpression"
                    ? variantGroup.value.properties.flatMap((variant) =>
                        variant.type === "Property" &&
                        variant.value.type === "ObjectExpression"
                          ? [variant.value]
                          : [],
                      )
                    : [],
                )
              : [],
          ),
        ];
        for (const rule of rules) {
          if (rule?.type !== "ObjectExpression") {
            continue;
          }
          process(rule);
        }
      },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'CallExpression:matches([callee.name="style"])': (node) => {
        const args = node.arguments[0];
        const rules = args.type === "ArrayExpression" ? args.elements : [args];
        for (const rule of rules) {
          if (rule?.type !== "ObjectExpression") {
            continue;
          }
          process(rule);
        }
      },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      expected: "Please scope your styles using @layer.",
    },
    schema: [],
    type: "suggestion",
  },
});
