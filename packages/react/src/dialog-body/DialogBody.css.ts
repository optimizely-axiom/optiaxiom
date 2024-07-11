import { recipe, style } from "../vanilla-extract";

export const body = recipe({
  base: [
    {
      fontSize: "md",
      overflow: "auto",
      px: "lg",
      py: "md",
    },
    style({
      maxHeight: "50dvh",
    }),
  ],
});
