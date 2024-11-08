import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      overflow: "hidden",
    },
    style({
      top: "12vh",
      translate: "-50% 0",
    }),
  ],
});
