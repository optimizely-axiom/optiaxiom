import { recipe, style } from "../vanilla-extract";

export const tabs = recipe({
  base: [
    {
      display: "flex",
    },
    style({
      selectors: {
        '&[data-orientation="horizontal"]': {
          flexDirection: "column",
        },
      },
    }),
  ],
});
