import { recipe, style } from "../vanilla-extract";

export const upload = recipe({
  base: [
    {
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
    },
    style({
      position: "relative",
    }),
  ],
});
