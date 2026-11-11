import { ESLintUtils } from "@typescript-eslint/utils";

/**
 * @param {import('@typescript-eslint/utils').TSESTree.Node} node
 */
function isSetup(node) {
  if (node.type === "FunctionDeclaration") {
    return node.id?.name === "setup";
  }
  if (
    node.type === "ArrowFunctionExpression" ||
    node.type === "FunctionExpression"
  ) {
    return (
      node.parent?.type === "VariableDeclarator" &&
      node.parent.id.type === "Identifier" &&
      node.parent.id.name === "setup"
    );
  }
  return false;
}

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      'CallExpression[callee.name="render"]': (node) => {
        /** @type {import('@typescript-eslint/utils').TSESTree.Node | undefined} */
        let current = node.parent;
        while (current) {
          if (isSetup(current)) {
            return;
          }
          current = current.parent;
        }
        context.report({ messageId: "setup", node });
      },
    };
  },

  defaultOptions: [],

  meta: {
    messages: {
      setup:
        "Call `render` from a `setup()` function in the `describe` block, and have tests call `setup()`. These specs ship in the MCP as the examples consumers copy, so they share one shape.",
    },
    schema: [],
    type: "suggestion",
  },
});
