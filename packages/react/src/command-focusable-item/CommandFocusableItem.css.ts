import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: style({
    selectors: {
      "&[data-highlighted][data-interaction=keyboard]": {
        outline: `2px solid ${theme.colors["border.active"]}`,
        outlineOffset: "1px",
      },
    },
  }),
});