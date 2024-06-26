import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";

/**
 * Forked from https://vanilla-extract.style/documentation/packages/recipes/
 */

import { recipeRuntime } from "./recipeRuntime";

export const recipe: typeof recipeRuntime = (options) => {
  const recipe = recipeRuntime(options);
  addFunctionSerializer(recipe, {
    // @ts-expect-error -- too complex
    args: [options],
    importName: "recipeRuntime",
    importPath: "../vanilla-extract/recipeRuntime",
  });
  return recipe;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecipeVariants<RecipeFn extends (...args: any) => any> =
  Parameters<RecipeFn>[0];
