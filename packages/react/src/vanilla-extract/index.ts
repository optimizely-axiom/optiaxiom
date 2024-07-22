export * from "./recipe";
export { responsiveStyle } from "./responsiveStyle";
export { style } from "./style";
export { styleVariants } from "./styleVariants";

export * from "@vanilla-extract/css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecipeVariants<RecipeFn extends (...args: any) => any> =
  Parameters<RecipeFn>[0];
