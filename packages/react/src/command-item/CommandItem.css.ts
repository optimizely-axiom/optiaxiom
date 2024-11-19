import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    style({
      selectors: {
        "&[data-highlighted][data-interaction=keyboard]": {
          outlineOffset: "-2px",
        },
      },
    }),
  ],
});
