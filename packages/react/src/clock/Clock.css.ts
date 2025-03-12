import { recipe, style } from "../vanilla-extract";

export const wheel = recipe({
  base: [
    {
      flexDirection: "column",
      gap: "2",
      justifyContent: "flex-start",
      overflow: "auto",
      px: "4",
    },
    style({
      scrollbarGutter: "stable",
    }),
  ],
});
