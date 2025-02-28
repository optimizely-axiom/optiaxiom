export { globalStyle } from "./globalStyle";
export * from "./recipe";
export { responsiveStyle } from "./responsiveStyle";
export { style } from "./style";

export const getVarName = (variable: string) => {
  const matches = variable.match(/^var\((.*)\)$/);
  if (matches) {
    return matches[1];
  }
  return variable;
};

export * from "@vanilla-extract/css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecipeVariants<RecipeFn extends (...args: any) => any> =
  Parameters<RecipeFn>[0];
