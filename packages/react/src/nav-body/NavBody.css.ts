import { recipe, style } from "../vanilla-extract";

export const body = recipe({
  base: [
    {
      flex: "1",
      gap: "4",
      justifyContent: "start",
      overflowX: "hidden",
      overflowY: "auto",
      py: "8",
      w: "full",
    },
    style({
      scrollbarGutter: "stable",
    }),
  ],
});
