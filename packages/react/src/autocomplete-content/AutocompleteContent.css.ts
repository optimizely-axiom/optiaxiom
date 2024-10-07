import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      p: "4",
    },
  ],
});

export const list = recipe({
  base: [
    style({
      overflow: "auto",
      overscrollBehavior: "contain",
    }),
  ],
});
