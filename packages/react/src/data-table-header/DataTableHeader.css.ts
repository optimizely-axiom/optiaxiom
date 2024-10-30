import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const button = recipe({
  base: [
    {
      gap: "4",
    },
    marker,
    style({
      color: theme.colors["fg.tertiary"],

      selectors: {
        "&:hover": {
          color: theme.colors["fg.secondary"],
        },
      },
    }),
  ],
});

export const icon = recipe({
  base: [
    {
      h: "16",
      w: "20",
    },
  ],
  variants: {
    sorted: {
      false: style({
        selectors: {
          [`${marker}:is(:not(:focus-within):not(:hover)) &`]: {
            visibility: "hidden",
          },
        },
      }),
      true: {},
    },
  },
});
