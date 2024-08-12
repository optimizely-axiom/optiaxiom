import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "surface",
      display: "flex",
      flexDirection: "column",
      shadow: "md",
      z: "popover",
    },
    style({
      position: "fixed",
    }),
  ],
  variants: {
    position: {
      bottom: style({
        bottom: 0,
        left: 0,
        right: 0,
      }),
      left: style({
        bottom: 0,
        height: "100%",
        left: 0,
        top: 0,
        width: "25%",
      }),
      right: style({
        bottom: 0,
        height: "100%",
        right: 0,
        top: 0,
        width: "25%",
      }),
    },
  },
});

export const overlay = recipe({
  base: [
    {
      bg: "overlay",
      z: "popover",
    },
    style({
      inset: "0",
      position: "fixed",
    }),
  ],
});

export const close = recipe({
  base: [
    {
      rounded: "full",
    },
    style({
      position: "absolute",
      right: 10,
      top: 24,
    }),
  ],
});

export type DrawerVariants = RecipeVariants<typeof content>;
