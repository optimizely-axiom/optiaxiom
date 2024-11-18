import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
    },
    style({
      selectors: {
        "&:not(:first-child)::before": {
          color: theme.colors["fg.tertiary"],
          content: "/",
          marginRight: "8px",
        },
      },
    }),
  ],
});
