import { recipe, style } from "../vanilla-extract";

export const nav = recipe({
  base: [
    {
      bg: "bg.default",
      flex: "1",
      gap: "0",
      overflow: "hidden",
      py: "16",
    },
    style({
      width: "248px",
    }),
  ],
});
