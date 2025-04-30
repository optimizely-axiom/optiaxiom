import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const link = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      fontSize: "md",
      h: "md",
      rounded: "md",
    },
    style({
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
  ],
});
