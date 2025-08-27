import { recipe, style } from "../vanilla-extract";

export const addon = recipe({
  base: style({
    width: "180px",
  }),

  variants: {
    slot: {
      after: {
        textAlign: "end",
      },
      before: {},
    },
  },
});
