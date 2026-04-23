import { recipe, style } from "../vanilla-extract";

export const title = recipe({
  base: [
    {
      flex: "1",
    },
    style({
      overflowWrap: "break-word",
    }),
  ],
});
