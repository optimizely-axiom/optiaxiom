import { type RecipeVariants, recipe } from "../vanilla-extract";

export const input = recipe({
  variants: {
    variant: {
      default: {
        textAlign: "start",
      },
      number: {
        textAlign: "end",
      },
    },
  },
});

export type InputVariants = RecipeVariants<typeof input>;
