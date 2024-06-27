import { recipe, style } from "../vanilla-extract";

export const code = recipe({
  base: style({
    WebkitFontSmoothing: "auto",
    fontSize: "0.875em",
  }),
});
