import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const viewport = recipe({
  base: [
    {
      p: "24",
      z: "popover",
    },
    style({
      outline: "none",
      position: "fixed",
    }),
  ],
  variants: {
    position: {
      bottom: style({
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
      }),
      "bottom-left": style({
        bottom: 0,
        left: 0,
      }),
      "bottom-right": style({
        bottom: 0,
        right: 0,
      }),
      top: style({
        left: "50%",
        top: 0,
        transform: "translateX(-50%)",
      }),
      "top-left": style({
        left: 0,
        top: 0,
      }),
      "top-right": style({
        right: 0,
        top: 0,
      }),
    },
  },
});

export type ViewportVariants = RecipeVariants<typeof viewport>;
