import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const root = recipe({
  base: [
    marker,
    {
      rounded: "inherit",
    },
    style({
      inset: "0",
      position: "absolute",

      selectors: {
        "&:has(:focus-visible)": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
      },
    }),
  ],
});

export const control = recipe({
  base: [
    style({
      left: "16px",
      position: "relative",
      top: "16px",

      selectors: {
        [`${marker}:has(:focus-visible) &`]: {
          outline: "none",
        },
      },
    }),
  ],
});
