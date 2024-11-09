import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "bg.default",
      display: "flex",
      flexDirection: "column",
      shadow: "md",
      z: "popover",
    },
    style({
      borderRadius: theme.borderRadius.lg,
      left: "50%",
      maxHeight: "75dvh",
      maxWidth: "calc(100dvw - 2 * 24px)",
      position: "fixed",
      top: "12dvh",
      translate: "-50% 0",
    }),
  ],
  variants: {
    size: {
      sm: style({
        width: "400px",
      }),
      md: style({
        width: "600px",
      }),
      lg: style({
        width: "800px",
      }),
      fullscreen: style({
        borderRadius: theme.borderRadius.none,
        height: "100dvh",
        maxHeight: "none",
        maxWidth: "none",
        top: "0",
        width: "100dvw",
      }),
    },
  },
});

export const overlay = recipe({
  base: [
    {
      bg: "bg.overlay",
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
      right: 24,
      top: 24,
    }),
  ],
});

export type DialogVariants = RecipeVariants<typeof content>;
