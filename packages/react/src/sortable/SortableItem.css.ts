import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: {
    transition: "opacity",
  },

  variants: {
    handle: {
      false: {},
      true: style({
        cursor: "grab",
      }),
    },
  },
});
