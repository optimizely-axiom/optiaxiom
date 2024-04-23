import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'CallExpression:matches([callee.name="style"])': (node) => {
        const args = node.arguments[0];
        const rules = args.type === "ArrayExpression" ? args.elements : [args];
        for (const rule of rules) {
          if (!rule) {
            continue;
          }
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
