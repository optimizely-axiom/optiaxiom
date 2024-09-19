import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      px: "12",
      py: "8",
      rounded: "lg",
      z: "popover",
    },
    style({
      minWidth: "var(--radix-tooltip-trigger-width)",
      position: "relative",
    }),
  ],
  variants: {
    theme: {
      dark: {
        bg: "bg.neutral.inverse",
        color: "white",
      },
      light: {
        bg: "surface",
        border: "1",
        borderColor: "border.secondary",
        shadow: "md",
      },
    },
  },
});

export const arrow = recipe({
  variants: {
    theme: {
      dark: style({
        fill: theme.colors["neutral.900"],
      }),
      light: style({
        fill: theme.colors["surface"],
        stroke: theme.colors["border.secondary"],
      }),
    },
  },
});
