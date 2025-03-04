import { recipe, style } from "../vanilla-extract";

export const nav = recipe({
  base: [
    {
      display: "flex",
      justifyContent: "space-between",
      w: "full",
    },
    style({
      position: "absolute",
    }),
  ],
});
