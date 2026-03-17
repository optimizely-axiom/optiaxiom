import { recipe as recipeRuntime } from "@optiaxiom/react/css-runtime";
/**
 * Forked from https://vanilla-extract.style/documentation/packages/recipes/
 */
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";

export const recipe: typeof recipeRuntime = (options) => {
  const recipe = recipeRuntime(options);
  addFunctionSerializer(recipe, {
    // @ts-expect-error -- too complex
    args: [options],
    importName: "recipe",
    importPath: "@optiaxiom/react/css-runtime",
  });
  return recipe;
};
