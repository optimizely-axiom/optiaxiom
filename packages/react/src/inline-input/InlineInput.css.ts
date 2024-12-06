import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const input = recipe({
  base: marker,
});

export const editor = recipe({
  base: style({
    selectors: {
      "&:focus-visible": {
        outline: "2px solid transparent",
      },
    },
  }),

  variants: {
    empty: {
      false: {},
      true: style({
        selectors: {
          "&::before": {
            color: theme.colors["border.active"],
            content: "attr(data-placeholder)",
            float: "left",
            height: "0",
            pointerEvents: "none",
          },
        },
      }),
    },
  },
});
