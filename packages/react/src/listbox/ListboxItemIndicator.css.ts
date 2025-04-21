import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const indicator = recipe({
  base: [
    style({
      clipPath: "inset(0 100% 0 0)",
      transition: `clip-path ${theme.duration.md}`,
    }),
  ],

  variants: {
    active: {
      false: {},
      true: style({
        clipPath: "inset(0 0 0 0)",
      }),
    },
  },
});
