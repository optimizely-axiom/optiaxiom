import { recipe, style } from "../vanilla-extract";

export const table = recipe({
  base: [
    {
      rounded: "lg",
      w: "full",
    },
    style({
      captionSide: "bottom",
    }),
  ],
});

export const wrapper = recipe({
  base: [
    {
      bg: "surface",
      border: "1",
      borderColor: "border.tertiary",
      overflow: "auto",
      rounded: "lg",
      w: "full",
    },
    style({
      position: "relative",
    }),
  ],
});
