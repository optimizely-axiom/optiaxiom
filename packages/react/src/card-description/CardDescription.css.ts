import { recipe, style } from "../vanilla-extract";

export const description = recipe({
  base: [
    {
      gap: "0",
      overflow: "hidden",
      pt: "16",
    },
    style({
      marginLeft: "-8px",
      marginRight: "-8px",
      width: "calc(100% + 16px)" /* Account for both left and right padding */,
    }),
  ],
});
