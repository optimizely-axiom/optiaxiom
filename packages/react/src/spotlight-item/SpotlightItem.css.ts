import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      fontWeight: "500",
      mx: "lg",
      px: "md",
      py: "sm",
    },
    style({
      backgroundColor: theme.colors["bg.secondary"],

      selectors: {
        "&:not([data-disabled])[data-highlighted]": {
          backgroundColor: theme.colors["fg.information"],
          color: theme.colors["fg.default.inverse"],
        },
        "&:not([data-disabled])[data-highlighted]:active": {
          backgroundColor: theme.colors["bg.information"],
        },
      },
    }),
  ],
});

export const description = recipe({
  base: [
    {
      fontSize: "md",
      mt: "2",
      transition: "colors",
    },
    style({
      selectors: {
        "[data-highlighted] &": {
          color: theme.colors["fg.default.inverse"],
        },
      },
    }),
  ],
});
