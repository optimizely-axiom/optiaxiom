import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const kbd = recipe({
  base: [
    {
      alignItems: "center",
      bg: "bg.secondary",
      display: "inline-flex",
      flexDirection: "row",
      px: "4",
      rounded: "sm",
      whiteSpace: "nowrap",
    },
    style({
      fontSize: "0.9em",
    }),
  ],

  variants: {
    variant: {
      outline: {
        border: "1",
        borderB: "2",
        borderColor: "border.tertiary",
        gap: "4",
      },
      subtle: {
        bg: "transparent",
        color: "fg.secondary",
        fontFamily: "sans",
        gap: "2",
        px: "0",
      },
    },
  },
});

export const keys = recipe({
  base: style({
    textDecoration: "none",
  }),

  variants: {
    variant: {
      outline: style({
        fontSize: "1.2em",
      }),
      subtle: {},
    },
  },
});

export type KdbVariants = RecipeVariants<typeof kbd>;
