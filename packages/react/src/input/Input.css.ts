import { recipe, type RecipeVariants } from "../vanilla-extract";

export const root = recipe({
  variants: {
    size: {
      md: {
        gap: "xs",
        px: "xs",
      },
      lg: {
        gap: "xs",
        px: "xs",
      },
      "2xl": {
        gap: "md",
        px: "md",
      },
    },
  },
});

export const input = recipe({
  variants: {
    appearance: {
      default: {
        textAlign: "start",
      },
      number: {
        textAlign: "end",
      },
    },
    size: {
      md: {
        py: "4",
      },
      lg: {
        py: "xs",
      },
      "2xl": {
        py: "md",
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
