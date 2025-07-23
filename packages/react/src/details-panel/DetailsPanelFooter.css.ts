import { recipe, style } from "../vanilla-extract";

export const footer = recipe({
  base: [
    {
      bg: "bg.default",
      flexDirection: "row",
      gap: "8",
      p: "16",
      pt: "8",
    },
    style({
      bottom: "0",
      position: "sticky",
    }),
  ],
});
