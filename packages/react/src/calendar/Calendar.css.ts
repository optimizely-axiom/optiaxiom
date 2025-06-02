import { recipe, style } from "../vanilla-extract";

export const picker = recipe({
  variants: {
    side: {
      bottom: {},
      left: {},
      right: {},
      top: style({
        minHeight: "274px",
      }),
    },
  },
});
