import { recipe, type RecipeVariants } from "../vanilla-extract";

export const indicator = recipe({
  base: [
    {
      h: "full",
      transition: "all",
    },
  ],
  variants: {
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

export type ProgressVariants = NonNullable<RecipeVariants<typeof indicator>>;
