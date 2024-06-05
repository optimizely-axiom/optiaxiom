import { createRecipe } from "../recipes";

export const progressRootRecipe = createRecipe({
  base: {
    border: "1",
    h: "6",
    overflow: "hidden",
    w: "1/2",
  },
  variants: {},
});

export const progressIndicatorRecipe = createRecipe({
  base: {
    bg: "bg.brand.solid",
    h: "full",
    rounded: "md",
    transition: "all",
  },
  variants: {},
});

export type Recipe = Parameters<typeof progressRootRecipe>[0];
