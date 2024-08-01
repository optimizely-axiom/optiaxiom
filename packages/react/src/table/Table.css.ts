import { recipe, style } from "../vanilla-extract";

export const table = recipe({
  base: [
    {
      w: "full",
    },
    style({
      borderRadius: "5px",
      borderSpacing: "0px",
      captionSide: "bottom",
      fontSize: "14px",
    }),
  ],
});
