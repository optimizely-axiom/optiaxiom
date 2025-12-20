import { recipe, style } from "../vanilla-extract";

export const addon = recipe({
  base: style({
    selectors: {
      "&:empty": {
        display: "none",
      },
    },
  }),
});
