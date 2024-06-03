import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: {
    bg: "white",
    border: "1",
    overflow: "hidden",
    position: "relative",
  },

  defaultVariants: {
    size: "md",
  },

  variants: {
    size: {
      md: { h: "6", w: "1/2" },
    },
  },
});

export type Recipe = Parameters<typeof recipe>[0];
