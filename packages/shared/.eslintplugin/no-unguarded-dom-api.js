import { ESLintUtils } from "@typescript-eslint/utils";

const FUNCTION_TYPES = new Set([
  "ArrowFunctionExpression",
  "FunctionDeclaration",
  "FunctionExpression",
]);

/**
 * jsdom (Jest's default environment) lacks `scrollIntoView` and
 * `ResizeObserver`, so calling either unguarded crashes consumer tests.
 */
export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    /** @type {Set<unknown>} */
    const guarded = new Set();

    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'CallExpression[callee.property.name="scrollIntoView"]': (node) => {
        if (!node.optional) {
          context.report({ messageId: "scrollIntoView", node });
        }
      },

      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['NewExpression']}
       */
      'NewExpression[callee.name="ResizeObserver"]': (node) => {
        /** @type {import("@typescript-eslint/utils").TSESTree.Node | undefined} */
        let current = node.parent;
        for (; current; current = current.parent) {
          if (guarded.has(current)) {
            return;
          }
        }
        context.report({ messageId: "resizeObserver", node });
      },

      /**
       * A `typeof ResizeObserver` check guards every `new ResizeObserver`
       * later in the same function.
       *
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['UnaryExpression']}
       */
      'UnaryExpression[operator="typeof"][argument.name="ResizeObserver"]': (
        node,
      ) => {
        /** @type {import("@typescript-eslint/utils").TSESTree.Node | undefined} */
        let current = node.parent;
        for (; current; current = current.parent) {
          if (FUNCTION_TYPES.has(current.type)) {
            guarded.add(current);
            return;
          }
        }
      },
    };
  },

  defaultOptions: [],

  meta: {
    messages: {
      resizeObserver:
        'Check `typeof ResizeObserver === "undefined"` before constructing it: jsdom does not implement it.',
      scrollIntoView:
        "Call `scrollIntoView?.()` optionally: jsdom does not implement it.",
    },
    schema: [],
    type: "problem",
  },
});
