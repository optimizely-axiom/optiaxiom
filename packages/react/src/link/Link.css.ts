import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const link = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "row",
      fontSize: "md",
      gap: "4",
    },
    style({
      textDecoration: "none",
    }),
  ],
});
