import { type RecipeVariants, recipe } from "../vanilla-extract";

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

export const decorator = recipe({
  base: {
    flex: "none",
  },

  variants: {
    position: {
      end: {
        mr: "8",
      },
      start: {
        ml: "8",
      },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },

  variantsCompounded: [
    {
      style: {
        mr: "4",
      },
      variants: {
        position: "end",
        size: "sm",
      },
    },
    {
      style: {
        ml: "4",
      },
      variants: {
        position: "start",
        size: "sm",
      },
    },
  ],
});

export type InputVariants = RecipeVariants<typeof input>;
