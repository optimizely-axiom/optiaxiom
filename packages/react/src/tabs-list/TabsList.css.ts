import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const list = recipe({
  base: [
    {
      borderColor: "border.tertiary",
      display: "flex",
    },
    style({
      selectors: {
        '&[data-orientation="horizontal"]': {
          flexDirection: "row",
        },
        '&[data-orientation="vertical"]': {
          flexDirection: "column",
        },
      },
    }),
  ],
  variants: {
    appearance: {
      primary: style({
        selectors: {
          '&[data-orientation="horizontal"]': {
            borderBottomWidth: "1px",
            gap: theme.spacing["24"],
          },
          '&[data-orientation="vertical"]': {
            borderRightWidth: "1px",
            gap: theme.spacing["8"],
          },
        },
      }),
      secondary: style({
        selectors: {
          '&[data-orientation="horizontal"]': {
            gap: theme.spacing["24"],
          },
          '&[data-orientation="vertical"]': {
            gap: theme.spacing["8"],
          },
        },
      }),
    },
  },
});
