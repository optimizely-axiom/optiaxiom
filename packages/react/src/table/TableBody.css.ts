import { recipe, style } from "../vanilla-extract";

export const body = recipe({
  base: [
    style({
      position: "relative",
    }),
  ],
});
