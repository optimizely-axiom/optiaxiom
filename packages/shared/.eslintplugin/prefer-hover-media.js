import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['Property']}
       */
      'CallExpression:matches([callee.name="recipe"], [callee.name="style"]) ObjectExpression > Property':
        (node) => {
          const key = node.key;
          const raw =
            key.type === "Literal"
              ? [key.raw]
              : key.type === "TemplateLiteral"
                ? key.quasis.map((quasi) => quasi.value.raw)
                : [];
          if (
            raw.every(
              (raw) =>
                !(raw.includes(":hover") && !raw.includes(":not(:hover)")),
            )
          ) {
            return;
          }

          let rule = node.parent.parent;
          while (
            !(
              rule.type === "ObjectExpression" &&
              rule.parent.type === "CallExpression"
            )
          ) {
            if (rule.parent) {
              rule = rule.parent;
            } else {
              return;
            }
          }

          const selectors = key.parent.parent?.parent;
          if (selectors?.parent?.type !== "ObjectExpression") {
            return;
          }

          const parent = selectors?.parent?.parent;
          if (
            parent?.type === "Property" &&
            parent.key.type === "Literal" &&
            parent.key.value === "(hover: hover)"
          ) {
            return;
          }

          const media = rule.properties.find(
            (prop) =>
              prop.type === "Property" &&
              prop.key.type === "Literal" &&
              prop.key.value === "@media",
          );
          const mediaToken =
            media?.type === "Property" &&
            context.sourceCode.getFirstToken(media.value);
          const hover =
            (media?.type === "Property" &&
              media.value.type === "ObjectExpression" &&
              media.value.properties.find(
                (prop) =>
                  prop.type === "Property" &&
                  prop.key.type === "Literal" &&
                  prop.key.value === "(hover: hover)",
              )) ||
            undefined;
          const hoverToken =
            hover?.type === "Property" &&
            context.sourceCode.getFirstToken(hover.value);
          const hoverSelectors =
            (hover?.type === "Property" &&
              hover.value.type === "ObjectExpression" &&
              hover.value.properties.find(
                (prop) =>
                  prop.type === "Property" &&
                  prop.key.type === "Identifier" &&
                  prop.key.name === "selectors",
              )) ||
            undefined;
          const hoverSelectorsToken =
            hoverSelectors?.type === "Property" &&
            context.sourceCode.getFirstToken(hoverSelectors.value);

          const block = context.sourceCode.getText(node, 0, 1);
          context.report({
            fix: (fixer) => [
              hoverSelectorsToken
                ? fixer.insertTextAfter(hoverSelectorsToken, block)
                : hoverToken
                  ? fixer.insertTextAfter(
                      hoverToken,
                      `selectors: { ${block} },`,
                    )
                  : mediaToken
                    ? fixer.insertTextAfter(
                        mediaToken,
                        `"(hover: hover)": { selectors: { ${block} } },`,
                      )
                    : fixer.insertTextBefore(
                        selectors,
                        `"@media": {"(hover: hover)": { selectors: { ${block} } }},\n\n`,
                      ),
              ...context.sourceCode
                .getTokens(node, 0, 1)
                .map((token) => fixer.remove(token)),
            ],
            messageId: "media",
            node: key,
          });
        },
    };
  },

  defaultOptions: [],

  meta: {
    fixable: "code",
    messages: {
      media:
        "Please place `:hover` selectors inside `@media (hover: hover)` blocks.",
    },
    schema: [],
    type: "suggestion",
  },
});
