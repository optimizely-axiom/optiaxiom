import { recipe, type RecipeVariants, style } from "../vanilla-extract";

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
      end: style({
        marginRight: "8px",
      }),
      start: style({
        marginLeft: "8px",
      }),
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },

  variantsCompounded: [
    {
      style: style({
        marginRight: "4",
      }),
      variants: {
        position: "end",
        size: "sm",
      },
    },
    {
      style: style({
        marginLeft: "4",
      }),
      variants: {
        position: "start",
        size: "sm",
      },
    },
  ],
});

export type InputVariants = RecipeVariants<typeof input>;
