import { recipe, style } from "../vanilla-extract";

export const nav = recipe({
  base: [
    {
      bg: "bg.default",
      flex: "1",
      gap: "0",
      overflow: "hidden",
      px: "4",
      py: "16",
    },
    style({
      width: "248px",
    }),
  ],
});
