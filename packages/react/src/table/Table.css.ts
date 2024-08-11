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

export const wrapper = recipe({
  base: [
    {
      border: "1",
      borderColor: "gray.200",
      overflow: "auto",
      rounded: "sm",
      w: "full",
    },
    style({
      position: "relative",
    }),
  ],
});
