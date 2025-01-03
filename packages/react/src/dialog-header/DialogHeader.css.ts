import { recipe, style } from "../vanilla-extract";

export const close = recipe({
  base: [
    style({
      order: "3",
    }),
  ],
});
