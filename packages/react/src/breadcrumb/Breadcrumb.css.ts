import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const list = recipe({
  base: [
    {
      alignItems: "center",
      color: "fg.default",
      display: "flex",
      fontSize: "md",
      gap: "8",
    },
    style({
      minHeight: theme.size.md,
    }),
  ],
});

export const link = recipe({
  base: style({
    color: theme.colors["fg.tertiary"],

    "@media": {
      "(hover: hover)": {
        selectors: {
          "&:hover:not([data-disabled])": {
            color: theme.colors["fg.secondary"],
          },
        },
      },
    },

    selectors: {
      "&:visited": {
        color: theme.colors["fg.tertiary"],
      },
    },
  }),
});
