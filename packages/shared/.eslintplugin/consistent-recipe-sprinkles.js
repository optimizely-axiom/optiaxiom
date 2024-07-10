import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['JSXSpreadAttribute']}
       */
      'JSXSpreadAttribute:has(MemberExpression[object.name="styles"])': ({
        parent,
      }) => {
        if (parent.type !== "JSXOpeningElement") {
          return;
        }

        const parserServices = ESLintUtils.getParserServices(context);
        const component = parserServices.getTypeAtLocation(parent.name);
        const props = component
          .getCallSignatures()[0]
          ?.getTypeParameterAtPosition(0);
        if (!props) {
          return;
        }

        for (const attribute of parent.attributes) {
          if (attribute.type === "JSXSpreadAttribute") {
            continue;
          }
          if (attribute.value?.type !== "Literal") {
            continue;
          }

          const source = props
            .getProperty(attribute.name.name)
            ?.getDeclarations()[0]
            .getSourceFile().fileName;
          if (source?.endsWith("sprinkles.css.ts")) {
            context.report({
              messageId: "expected",
              node: attribute.name,
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
      expected:
        "Please avoid inlining sprinkle props when using recipes and move them inside the recipe base instead.",
    },
    schema: [],
    type: "suggestion",
  },
});
