import { recipe, style } from "../vanilla-extract";

export const icon = recipe({
  base: [
    {
      transition: "transform",
    },
    style({
      selectors: {
        "[data-state=open] > &": {
          transform: "rotate(180deg)",
        },
      },
    }),
  ],
});
