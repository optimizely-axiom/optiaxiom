import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: style({
    selectors: {
      "&[data-highlighted][data-focus-visible]": {
        outline: `2px solid ${theme.colors["border.control"]}`,
        outlineOffset: "1px",
      },
    },
  }),
});
