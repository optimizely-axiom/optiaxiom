import { recipe, style } from "../vanilla-extract";

export const trigger = recipe({
  base: style({
    textDecoration: "none",
  }),
});
