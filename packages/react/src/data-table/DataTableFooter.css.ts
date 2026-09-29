import { rem } from "../utils";
import { recipe, style } from "../vanilla-extract";

export const addon = recipe({
  base: style({
    width: rem("180px"),
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
