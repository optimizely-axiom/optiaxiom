import { rem } from "../utils";
import { recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: style({
    position: "absolute",
    right: rem("32px"),
    top: 0,
  }),
});
