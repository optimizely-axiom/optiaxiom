import { recipe, style } from "../vanilla-extract";

export const heading = recipe({
  base: {
    fontFamily: "heading",
  },
  variants: {
    level: {
      "2": style({
        lineHeight: "1.875rem",
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
