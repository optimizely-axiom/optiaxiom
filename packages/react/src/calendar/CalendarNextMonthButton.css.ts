import { recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: style({
    position: "absolute",
    right: "0",
  }),
});
