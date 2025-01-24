import { recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: {
    mt: "8",
  },

  variants: {
    outside: {
      false: {},
      true: style({
        opacity: 0.6,
      }),
    },
  },
});
