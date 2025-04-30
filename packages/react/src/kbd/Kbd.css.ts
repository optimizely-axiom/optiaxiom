import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const kbd = recipe({
  base: {
    alignItems: "center",
    color: "fg.secondary",
    display: "inline-flex",
    flexDirection: "row",
    fontFamily: "sans",
    gap: "2",
    whiteSpace: "nowrap",
  },

  variants: {
    variant: {
      outline: [
        {
          bg: "bg.secondary",
          border: "1",
          borderB: "2",
          borderColor: "border.secondary",
          px: "6",
          rounded: "sm",
        },
        style({
          fontSize: "0.8em",
        }),
      ],
      subtle: {},
    },
  },
});

export const keys = recipe({
  base: style({
    textDecoration: "none",
  }),
});

export type KdbVariants = RecipeVariants<typeof kbd>;
