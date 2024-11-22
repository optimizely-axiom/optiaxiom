import { recipe, style } from "../vanilla-extract";

export const title = recipe({
  base: [
    {
      flex: "1",
      fontWeight: "500",
    },
    style({
      order: "1",
    }),
  ],
});
