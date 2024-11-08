import { recipe, style } from "../vanilla-extract";

export const input = recipe({
  base: [
    {
      border: "0",
      borderB: "1",
      borderColor: "border.secondary",
      rounded: "none",
    },
    style({
      selectors: {
        "&:has(:focus)": {
          outline: "none !important",
        },
      },
    }),
  ],
});
