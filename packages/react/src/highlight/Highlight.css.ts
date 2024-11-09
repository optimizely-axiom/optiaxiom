import { recipe, style } from "../vanilla-extract";

export const mark = recipe({
  base: style({
    backgroundColor: "transparent",
    color: "inherit",
  }),
});
