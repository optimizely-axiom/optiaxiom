import { recipe, style } from "../vanilla-extract";

export const title = recipe({
  base: [
    {
      gap: "0",
      pt: "16",
    },
    style({
      marginLeft: "-8px",
      marginRight: "-8px",
      width: "calc(100% + 16px)",
    }),
  ],
});
