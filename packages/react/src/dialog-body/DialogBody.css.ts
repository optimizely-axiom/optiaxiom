import { recipe, style } from "../vanilla-extract";

export const body = recipe({
  base: [
    {
      flex: "1",
      fontSize: "md",
      justifyContent: "start",
      overflow: "auto",
      px: "24",
      py: "16",
    },
    style({
      scrollbarGutter: "stable",
    }),
  ],
});
