/** @type {import('@typescript-eslint/utils').TSESLint.RuleModule<string>} */
export default {
  create(context) {
    return {
      /**
       * Check TSX files for component prop descriptions
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
       * Check CSS.ts files for recipe variant descriptions
       * Matches: export const foo = recipe({ variants: { ... } })
       * Then checks if there's a corresponding RecipeVariants export
       * @type {import('@typescript-eslint/utils').TSESLint.RuleListener['CallExpression']}
       */
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[init.callee.name=recipe] > CallExpression":
        (node) => {
          // Get the recipe name from the variable declarator
          const declarator = node.parent;
          if (
            declarator.type !== "VariableDeclarator" ||
            declarator.id.type !== "Identifier"
          ) {
            return;
          }
          const recipeName = declarator.id.name;

          // Convert recipe name to expected variants type name
          // e.g., "alert" -> "AlertVariants"
          const variantsTypeName =
            recipeName.charAt(0).toUpperCase() +
            recipeName.slice(1) +
            "Variants";

          // Check if this file exports the corresponding RecipeVariants type
          const program = context.sourceCode.ast;
          const hasVariantsExport = program.body.some(
            (statement) =>
              statement.type === "ExportNamedDeclaration" &&
              statement.declaration?.type === "TSTypeAliasDeclaration" &&
              statement.declaration.id.name === variantsTypeName &&
              statement.declaration.typeAnnotation?.type ===
                "TSTypeReference" &&
              statement.declaration.typeAnnotation.typeName?.type ===
                "Identifier" &&
              statement.declaration.typeAnnotation.typeName.name ===
                "RecipeVariants",
          );

          if (!hasVariantsExport) {
            return;
          }

          // Get the recipe config object (first argument to recipe())
          const recipeConfig = node.arguments[0];
          if (!recipeConfig || recipeConfig.type !== "ObjectExpression") {
            return;
          }

          // Find the variants property
          const variantsProp = recipeConfig.properties.find(
            (prop) =>
              prop.type === "Property" &&
              prop.key.type === "Identifier" &&
              prop.key.name === "variants",
          );

          if (
            !variantsProp ||
            variantsProp.type !== "Property" ||
            variantsProp.value.type !== "ObjectExpression"
          ) {
            return;
          }

          // Check each variant property for JSDoc
          for (const prop of variantsProp.value.properties) {
            if (prop.type !== "Property" || prop.key.type !== "Identifier") {
              continue;
            }

            const comments = context.sourceCode
              .getCommentsBefore(prop)
              .filter((comment) => comment.type === "Block");

            if (comments.length === 0) {
              context.report({
                data: { property: prop.key.name },
                messageId: "expected",
                node: prop,
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
};
