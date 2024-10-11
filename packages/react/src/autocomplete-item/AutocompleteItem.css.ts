import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      fontSize: "md",
      gap: "xs",
      justifyContent: "space-between",
      p: "xs",
      rounded: "sm",
    },
    style({
      cursor: "default",
      outline: "none",
      position: "relative",
      userSelect: "none",

      selectors: {
        "&:not([data-disabled])": {
          color: theme.colors["fg.default"],
          cursor: "pointer",
        },
        "&:not([data-disabled])[data-highlighted]": {
          backgroundColor: theme.colors["bg.secondary"],
        },
        "&:not([data-disabled])[data-highlighted]:active": {
          backgroundColor: theme.colors["bg.secondary.hovered"],
        },
        '&:not([data-highlighted])[data-state="open"]': {
          backgroundColor: theme.colors["bg.secondary"],
        },
        "&[data-disabled]": {
          color: theme.colors["fg.disabled"],
          pointerEvents: "none",
        },
      },
    }),
  ],
});
