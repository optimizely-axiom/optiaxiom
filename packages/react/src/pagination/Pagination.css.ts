import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const list = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "2",
    },
    style({
      position: "relative",
    }),
  ],
});

export const cursor = recipe({
  base: [
    {
      transition: "transform",
      z: "10",
    },
    style({
      minWidth: theme.size.md,
      pointerEvents: "none",
      position: "absolute",
    }),
  ],

  variants: {
    animation: {
      false: style({
        visibility: "hidden",
      }),

      true: style({
        visibility: "visible",
      }),
    },
  },
});

export const button = recipe({
  base: style({
    minWidth: theme.size.md,
  }),
});
