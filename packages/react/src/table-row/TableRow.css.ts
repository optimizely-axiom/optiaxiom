import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const row = recipe({
  base: [
    className,
    {
      transition: "colors",
      w: "full",
    },
    style({
      position: "relative",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover": {
              backgroundColor: theme.colors["bg.default.hovered"],
            },
          },
        },
      },
      selectors: {
        "&[data-highlighted]": {
          backgroundColor: theme.colors["bg.default.hovered"],
        },
      },
    }),
  ],
});
