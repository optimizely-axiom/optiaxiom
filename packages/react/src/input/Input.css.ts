import { recipe, type RecipeVariants } from "../vanilla-extract";

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
      xl: {},
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
    {
      style: {
        mr: "md",
      },
      variants: {
        position: "end",
        size: "xl",
      },
    },
    {
      style: {
        ml: "md",
      },
      variants: {
        position: "start",
        size: "xl",
      },
    },
  ],
});

export type InputVariants = RecipeVariants<typeof input>;
