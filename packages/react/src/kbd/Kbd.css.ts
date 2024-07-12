import { recipe, style } from "../vanilla-extract";

export const keys = recipe({
  base: style({
    fontSize: "1.2em",
    lineHeight: "1",
    textDecoration: "none",
  }),
});
