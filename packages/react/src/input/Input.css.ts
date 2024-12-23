import { recipe, type RecipeVariants } from "../vanilla-extract";

export const root = recipe({
  variants: {
    size: {
      md: {
        gap: "8",
        px: "8",
      },
      lg: {
        gap: "8",
        px: "8",
      },
      xl: {
        gap: "12",
        px: "12",
      },
    },
  },
});

export const input = recipe({
  variants: {
    /**
     * Control the appearance of the input.
     */
    appearance: {
      default: {
        textAlign: "start",
      },
      number: {
        textAlign: "end",
      },
    },
    /**
     * Control the size of the input.
     */
    size: {
      md: {
        py: "4",
      },
      lg: {
        py: "8",
      },
      xl: {
        py: "12",
      },
    },
  },
});

export const addon = recipe({
  base: {
    display: "flex",
    flex: "none",
  },
});

export type InputVariants = RecipeVariants<typeof input>;
