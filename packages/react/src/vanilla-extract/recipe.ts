/**
 * Forked from https://vanilla-extract.style/documentation/packages/recipes/
 */
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";

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
