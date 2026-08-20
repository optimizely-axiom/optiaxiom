import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const heading = recipe({
  base: {
    fontFamily: "heading",
  },
  variants: {
    level: {
      "1": style({
        fontSize: theme.fontSize["4xl"].fontSize,
        lineHeight: 1.04,
      }),
      "2": style({
        fontSize: theme.fontSize["3xl"].fontSize,
        lineHeight: 1.04,
      }),
      "3": style({
        fontSize: theme.fontSize.xl.fontSize,
        lineHeight: 1.1,
      }),
      "4": style({
        fontSize: theme.fontSize.lg.fontSize,
        lineHeight: 1.3,
      }),
    },
    tracking: {
      wide: style({
        letterSpacing: "1%",
      }),
      wider: style({
        letterSpacing: "2%",
      }),
      widest: style({
        letterSpacing: "3%",
      }),
    },
  },
});
