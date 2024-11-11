import { recipe, type RecipeVariants } from "../vanilla-extract";

export const root = recipe({
  variants: {
    size: {
      md: {
        gap: "xs",
        px: "xs",
        py: "4",
      },
      lg: {
        gap: "xs",
        p: "xs",
      },
      "2xl": {
        gap: "md",
        p: "md",
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
  },
});

export const addon = recipe({
  base: {
    display: "flex",
    flex: "none",
  },
});

export type InputVariants = RecipeVariants<typeof input>;
