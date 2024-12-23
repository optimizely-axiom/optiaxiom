import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const progress = recipe({
  base: [
    {
      bg: "bg.tertiary",
      overflow: "hidden",
      rounded: "full",
    },
    style({
      height: "8px",
    }),
  ],
});

export const indicator = recipe({
  base: [
    {
      h: "full",
      transition: "all",
    },
  ],
  variants: {
    /**
     * Control the appearance by selecting between the different progress types.
     */
    intent: {
      danger: {
        bg: "bg.error",
      },
      primary: {
        bg: "bg.accent",
      },
      success: {
        bg: "bg.success",
      },
    },
  },
});

export type ProgressVariants = RecipeVariants<typeof indicator>;
