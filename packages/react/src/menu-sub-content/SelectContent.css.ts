import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    style({
      overflow: "auto",
      overscrollBehavior: "contain",
    }),
  ],
});
