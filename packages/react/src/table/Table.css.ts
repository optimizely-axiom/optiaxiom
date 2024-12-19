import { recipe, style } from "../vanilla-extract";

export const table = recipe({
  base: [
    {
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
      bg: "bg.default",
      border: "1",
      borderColor: "border.tertiary",
      maxW: "full",
      overflow: "auto",
      rounded: "lg",
    },
    style({
      position: "relative",
    }),
  ],
});
