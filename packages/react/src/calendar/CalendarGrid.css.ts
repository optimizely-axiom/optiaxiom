import { recipe, style } from "../vanilla-extract";

export const grid = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      gap: "2",
    },
    style({
      height: 192,
      width: 236,
    }),
  ],
});
