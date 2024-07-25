import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const wrapper = recipe({
  base: [
    {
      border: "1",
      p: "md",
      rounded: "md",
    },
    style({
      borderStyle: "dashed",
    }),
  ],
});
export const dropzone = recipe({
  base: [
    {
      border: "1",
      p: "lg",
      rounded: "sm",
    },
    style({
      borderStyle: "dashed",
    }),
  ],
});
