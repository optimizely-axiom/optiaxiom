import { recipe, style } from "../vanilla-extract";

export const detail = recipe({
  base: [
    {
      color: "fg.secondary",
    },
    style({
      flexShrink: 99999,
    }),
  ],
});
