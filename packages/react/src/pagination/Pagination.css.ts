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
      justifyContent: "center",
      z: "10",
    },
    style({
      minWidth: theme.size.md,
      pointerEvents: "none",
      position: "absolute",
      visibility: "hidden",
    }),
  ],

  variants: {
    animation: {
      false: {},
      true: {
        transition: "transform",
      },
    },
  },
});

export const button = recipe({
  base: [
    {
      justifyContent: "center",
    },
    style({
      minWidth: theme.size.md,
    }),
  ],
});
