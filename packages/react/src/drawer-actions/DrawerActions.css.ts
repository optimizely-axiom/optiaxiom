import { recipe, style } from "../vanilla-extract";

export const actions = recipe({
  base: [
    {
      flexDirection: "row-reverse",
      gap: "xs",
    },
    style({
      order: "2",
    }),
  ],
});
