import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      gap: "8",
      maxW: undefined,
    },
    style({
      width: "258px",
    }),
  ],
});
