import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['TSPropertySignature']}
       */
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration[id.name=/Props$/] TSPropertySignature":
        (node) => {
          if (node.key.type !== "Identifier") {
            return;
          }
          if (["children", "className"].includes(node.key.name)) {
            return;
          }
          if (node.typeAnnotation?.typeAnnotation.type === "TSNeverKeyword") {
            return;
          }

          const comments = context.sourceCode
            .getCommentsBefore(node)
            .filter((comment) => comment.type === "Block");
          if (comments.length === 0) {
            context.report({
              data: { property: node.key.name },
              messageId: "expected",
              node,
            });
          }
        },
      /**
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['TSQualifiedName']}
       */
      "Program > ExportNamedDeclaration > TSTypeAliasDeclaration[id.name=/Props$/] TSQualifiedName[left.name=styles]":
        (node) => {
          let parent =
            node.parent.type === "TSTypeReference" ? node.parent : null;
          const exclude = [];
          while (parent?.type === "TSTypeReference") {
            if (
              parent.typeName.type === "Identifier" &&
              parent.typeName.name === "Omit"
            ) {
              const union = parent.typeArguments?.params[1];
              if (union?.type === "TSUnionType") {
                exclude.push(
                  ...union.types.flatMap((type) =>
                    type.type === "TSLiteralType" &&
                    type.literal.type === "Literal"
                      ? [type.literal.value]
                      : null,
                  ),
                );
              }
              break;
            } else if (
              parent.typeName === node ||
              (parent.typeName.type === "Identifier" &&
                parent.typeName.name === "NonNullable")
            ) {
              /**
               * @type {import('@typescript-eslint/utils').TSESTree.Node | undefined}
               */
              let cursor = parent.parent;
              while (cursor && cursor.type !== "TSTypeReference") {
                cursor = cursor?.parent;
              }
              parent = cursor ?? null;
            } else {
              break;
            }
          }

          const parserServices = ESLintUtils.getParserServices(context);
          const variants = parserServices.getTypeAtLocation(node.right);

          for (const property of variants
            .getNonNullableType()
            .getProperties()) {
            if (exclude.includes(property.getEscapedName().toString())) {
              continue;
            }

            const comments = property.getDocumentationComment(undefined);
            if (comments.length === 0) {
              context.report({
                data: { property: property.getEscapedName() },
                messageId: "expected",
                node,
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
      expected: 'Please include a description for the "{{property}}" prop',
    },
    schema: [],
    type: "suggestion",
  },
});
