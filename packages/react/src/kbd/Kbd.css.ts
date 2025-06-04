import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const kbd = recipe({
  base: {
    display: "inline-flex",
    gap: "2",
    whiteSpace: "nowrap",
  },
});

export const key = recipe({
  base: {
    alignItems: "center",
    color: "fg.secondary",
    display: "inline-flex",
    fontFamily: "sans",
    gap: "2",
    justifyContent: "center",
  },

  variants: {
    /**
     * Control the style of the element.
     */
    variant: {
      outline: [
        {
          bg: "bg.secondary",
          border: "1",
          borderB: "2",
          borderColor: "border.secondary",
          rounded: "sm",
        },
        style({
          fontSize: "0.8em",
          minWidth: "calc(1lh + 5px)", // line-height + border + padding
          padding: "1px 5px",
        }),
      ],
      subtle: {},
    },
  },
});

export type KeyVariants = RecipeVariants<typeof key>;
