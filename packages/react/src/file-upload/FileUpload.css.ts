import { recipe, style } from "../vanilla-extract";

export const upload = recipe({
  base: [
    {
      color: "fg.default",
    },
    style({
      position: "relative",
    }),
  ],
});
