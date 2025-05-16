import { recipe, style } from "../vanilla-extract";

export const cardImage = recipe({
  base: [
    {
      h: "full",
      rounded: "inherit",
      w: "full",
    },
    style({
      aspectRatio: "2",
      objectFit: "cover",
    }),
  ],
});
