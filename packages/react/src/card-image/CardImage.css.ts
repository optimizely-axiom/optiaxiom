import { recipe, style } from "../vanilla-extract";

export const cardImage = recipe({
  base: [
    {
      rounded: "inherit",
      size: "full",
    },
    style({
      objectFit: "cover",
    }),
  ],
});
