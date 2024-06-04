import { createRecipe } from "../recipes";

export const progressRootRecipe = createRecipe({
  base: {
    border: "1",
    overflow: "hidden",
  },
  variants: {
    size: {
      default: { h: "6", w: "1/2" },
    },
    variant: {
      default: {
        bg: "white",
      },
    },
  },
});

export const progressIndicatorRecipe = createRecipe({
  variants: {
    variant: {
      default: {
        bg: "bg.brand.solid",
        h: "full",
        rounded: "md",
        transition: "all",
      },
    },
  },
});

export type Recipe = Parameters<typeof progressRootRecipe>[0];
