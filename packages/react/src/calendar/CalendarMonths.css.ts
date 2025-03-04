import { recipe, style } from "../vanilla-extract";

export const months = recipe({
  base: [
    {
      alignItems: "start",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    style({
      position: "relative",
    }),
  ],
});
