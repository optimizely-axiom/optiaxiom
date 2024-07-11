import { recipe, style } from "../vanilla-extract";

export const body = recipe({
  base: [
    {
      fontSize: "md",
      overflow: "auto",
      px: "24",
      py: "16",
    },
    style({
      maxHeight: "50dvh",
    }),
  ],
});
