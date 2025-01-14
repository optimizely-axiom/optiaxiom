import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      fontWeight: "500",
      mx: "24",
      px: "16",
      py: "12",
    },
    style({
      backgroundColor: theme.colors["bg.secondary"],

      selectors: {
        "&:not([data-disabled])[data-highlighted]": {
          backgroundColor: theme.colors["bg.secondary.hovered"],
        },
        "&:not([data-disabled])[data-highlighted]:active": {
          backgroundColor: theme.colors["bg.tertiary"],
        },
      },
    }),
  ],
});
