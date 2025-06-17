import { recipe, style } from "../vanilla-extract";

export const header = recipe({
  base: [
    {
      bg: "bg.default",
      flexDirection: "row",
      gap: "8",
      p: "24",
      pb: "16",
      z: "10",
    },
    style({
      position: "sticky",
      top: "0",
    }),
  ],
});
