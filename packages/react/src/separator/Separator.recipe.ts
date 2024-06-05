import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: { bg: "bg.brand.solid" },
  defaultVariants: {
    orientation: "horizontal",
  },
  variants: {
    orientation: {
      horizontal: {
        h: "2",
        my: "6",
        w: "full",
      },
      vertical: {
        h: "full",
        mx: "6",
        w: "2",
      },
    },
  },
});

export type Recipe = Parameters<typeof recipe>[0];
