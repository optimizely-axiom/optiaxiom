import { recipe, style } from "../vanilla-extract";

export const header = recipe({
  base: [
    {
      bg: "bg.default",
      display: "flex",
      flexWrap: "wrap",
      p: "16",
      pb: "8",
    },
    style({
      columnGap: "4px",
      position: "sticky",
      top: "0",
    }),
  ],
});
