import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: style({
    maxHeight: "min(448px, 75dvh)",
    width: "640px",
  }),
});
