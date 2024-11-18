import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      p: "0",
    },
    style({
      overflow: "auto",
      overscrollBehavior: "contain",

      selectors: {
        [`&:empty`]: {
          visibility: "hidden",
        },
      },
    }),
  ],
});
