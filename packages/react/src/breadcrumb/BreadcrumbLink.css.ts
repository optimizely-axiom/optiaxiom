import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const link = recipe({
  base: [
    {
      fontSize: "md",
      overflow: "hidden",
      rounded: "md",
    },
    style({
      color: theme.colors["fg.tertiary"],
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",

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
