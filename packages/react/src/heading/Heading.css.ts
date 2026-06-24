import { recipe, style } from "../vanilla-extract";

export const heading = recipe({
  base: {
    fontFamily: "heading",
  },
  variants: {
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
