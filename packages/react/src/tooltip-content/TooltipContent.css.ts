import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "bg.neutral.inverse",
      color: "white",
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
});

export const arrow = recipe({
  base: [
    style({
      fill: theme.colors["neutral.900"],
    }),
  ],
});
