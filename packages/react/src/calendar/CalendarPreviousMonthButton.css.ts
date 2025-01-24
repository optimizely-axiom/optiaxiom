import { recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: style({
    left: "0",
    position: "absolute",
  }),
});
