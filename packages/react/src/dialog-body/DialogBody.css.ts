import { recipe, style } from "../vanilla-extract";

export const body = recipe({
  base: [
    {
      fontSize: "md",
      overflow: "auto",
      pb: "md",
      pt: "lg",
      px: "lg",
    },
    style({
      maxHeight: "50dvh",
    }),
  ],
});
