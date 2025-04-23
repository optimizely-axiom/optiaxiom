import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    /**
     * @type {import('@typescript-eslint/utils').TSESTree.Literal[]}
     */
    const hooks = [];

    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      "CallExpression[callee.name=/^use.+Context$/]": (node) => {
        const arg = node.arguments[0];
        if (arg?.type !== "Literal") {
          return;
        }

        hooks.push(arg);
      },
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      "CallExpression[callee.name=createSlot]": (node) => {
        const arg = node.arguments[0];
        if (arg?.type !== "Literal") {
          return;
        }

        hooks.push(arg);
      },
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['VariableDeclarator']}
       */
      'Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.type="ArrayPattern"][init.type="CallExpression"][init.callee.name="createContext"]':
        (node) => {
          if (
            node.id.type !== "ArrayPattern" ||
            node.init?.type !== "CallExpression" ||
            node.init.callee.type !== "Identifier"
          ) {
            return;
          }

          const name = node.init.arguments[0];
          if (name.type !== "Literal") {
            return;
          }

          const provider = node.id.elements[0];
          if (provider?.type !== "Identifier") {
            return;
          }

          const expected = [
            `@optiaxiom/react/${provider.name.replace(/Provider$/, "")}`,
            `@optiaxiom/globals/${provider.name.replace(/Provider$/, "")}`,
          ];
          if (
            !(typeof name.value === "string" && expected.includes(name.value))
          ) {
            context.report({
              fix: (fixer) => fixer.replaceText(name, `"${expected[0]}"`),
              messageId: "expected",
              node: name,
            });
          }
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

          const expected = [
            `@optiaxiom/react/${node.left.object.name}`,
            `@optiaxiom/docs/${node.left.object.name}`,
          ];
          if (
            !(
              typeof node.right.value === "string" &&
              expected.includes(node.right.value)
            )
          ) {
            context.report({
              fix: (fixer) => fixer.replaceText(node.right, `"${expected[0]}"`),
              messageId: "expected",
              node,
            });
          } else {
            const expected = node.right.value;
            for (const hook of hooks) {
              if (hook.value !== expected) {
                context.report({
                  fix: (fixer) => fixer.replaceText(hook, `"${expected}"`),
                  messageId: "expected",
                  node: hook,
                });
              }
            }
          }
        },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      expected: "Please prefix the component displayName with the package name",
    },
    schema: [],
    type: "suggestion",
  },
});
