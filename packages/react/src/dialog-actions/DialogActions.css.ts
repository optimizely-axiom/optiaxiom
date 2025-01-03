import { recipe, style } from "../vanilla-extract";

export const actions = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "8",
    },
    style({
      order: "2",
    }),
  ],
});
