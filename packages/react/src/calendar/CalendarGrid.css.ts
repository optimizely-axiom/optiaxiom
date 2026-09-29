import { rem } from "../utils";
import { recipe, style } from "../vanilla-extract";

export const grid = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      gap: "2",
    },
    style({
      height: rem("192px"),
      width: rem("236px"),
    }),
  ],
});
