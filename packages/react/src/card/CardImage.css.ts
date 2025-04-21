import { recipe, style } from "../vanilla-extract";

export const cardImage = recipe({
  base: [
    {
      h: "full",
      rounded: "inherit",
    },
    style({
      objectFit: "cover",
    }),
  ],

  variants: {
    orientation: {
      horizontal: [
        {
          w: "auto",
        },
        style({
          aspectRatio: "1",
        }),
      ],
      vertical: [
        {
          w: "full",
        },
        style({
          aspectRatio: "2",
        }),
      ],
    },
  },
});
