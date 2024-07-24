import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const indicator = recipe({
  base: [
    {
      alignItems: "center",
      fontSize: "sm",
      fontWeight: "500",
      justifyContent: "center",
      p: "2",
      rounded: "xl",
    },
    style({
      minHeight: "20px",
      minWidth: "20px",
      position: "absolute",
      zIndex: 1,
    }),
  ],

  variants: {
    position: {
      "bottom-right": style({
        bottom: 0,
        right: 0,
        transform: "translate(50%, 50%)",
      }),

      "top-right": style({
        right: 0,
        top: 0,
        transform: "translate(50%, -50%)",
      }),
    },
  },
});

export const wrapper = recipe({
  base: style({
    position: "relative",
  }),
});

export type IndicatorVariants = NonNullable<RecipeVariants<typeof indicator>>;
