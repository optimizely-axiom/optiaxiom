import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    style({
      display: "flex",
      flexDirection: "row",
      padding: "4px",

      selectors: {
        "&:not([data-disabled])": {
          color: theme.colors["fg.default"],
          cursor: "pointer",
        },
        "&:not([data-disabled])[data-highlighted]": {
          backgroundColor: theme.colors["bg.input.disabled"],
        },
        "&:not([data-disabled])[data-highlighted]:active": {
          backgroundColor: theme.colors["neutral.1200/12"],
        },
        '&:not([data-highlighted])[data-state="open"]': {
          backgroundColor: theme.colors["bg.input.disabled"],
        },
        "&[data-disabled]": {
          color: theme.colors["fg.disabled"],
          pointerEvents: "none",
        },
      },
    }),
  ],
});
