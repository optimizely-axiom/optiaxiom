import { recipe, style } from "../vanilla-extract";

export const description = recipe({
  base: [
    {
      color: "fg.secondary",
      fontWeight: "400",
      w: "full",
    },
    style({
      order: "4",
    }),
  ],
});
