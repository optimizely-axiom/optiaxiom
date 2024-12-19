import { recipe, style } from "../vanilla-extract";

export const table = recipe({
  base: [
    {
      w: "full",
    },
    style({
      captionSide: "bottom",
      /**
       * Setting the table height to 1px allows cell content to stretch and fill
       * up the whole cell height.
       */
      height: "1px",
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
