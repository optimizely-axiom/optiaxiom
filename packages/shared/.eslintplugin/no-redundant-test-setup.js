import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['ImportSpecifier']}
       */
      'ImportDeclaration[source.value=/(^|\\/)testing$/] > ImportSpecifier[imported.name="cleanup"]':
        (node) => {
          context.report({ messageId: "cleanup", node });
        },
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['MemberExpression']}
       */
      'MemberExpression[object.name="vi"]:matches([property.name="useFakeTimers"], [property.name="useRealTimers"])':
        (node) => {
          context.report({ messageId: "timers", node });
        },
    };
  },

  defaultOptions: [],

  meta: {
    messages: {
      cleanup:
        "`cleanup` already runs before every test in `vitest.setup.ts`. Don't call it per spec.",
      timers:
        "Fake timers are already enabled for every test by `vitest.setup.ts`. Don't switch them per spec.",
    },
    schema: [],
    type: "problem",
  },
});
