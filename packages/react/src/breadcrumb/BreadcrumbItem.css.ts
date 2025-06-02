import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      gap: "4",
      whiteSpace: "nowrap",
    },
    style({
      maxWidth: "160px",

      selectors: {
        "&:not(:first-child)::before": {
          color: theme.colors["fg.tertiary"],
          content: "/",
          marginRight: "4px",
        },
      },
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
