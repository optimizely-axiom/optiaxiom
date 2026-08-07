import { recipe, style } from "../vanilla-extract";

export const heading = recipe({
  base: {
    fontFamily: "heading",
  },
  variants: {
    level: {
      "1": {},
      "2": style({
        lineHeight: "1.875rem",
      }),
      "3": {},
      "4": {},
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
