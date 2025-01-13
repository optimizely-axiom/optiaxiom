import { recipe, style } from "../vanilla-extract";

export const cardImage = recipe({
  base: [
    {
      size: "full",
    },
    style({
      objectFit: "cover",
    }),
  ],
});
