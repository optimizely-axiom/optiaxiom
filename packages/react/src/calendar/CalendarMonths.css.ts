import { recipe, style } from "../vanilla-extract";

export const months = recipe({
  base: [
    {
      alignItems: "start",
      gap: "16",
    },
    style({
      position: "relative",
    }),
  ],
});
