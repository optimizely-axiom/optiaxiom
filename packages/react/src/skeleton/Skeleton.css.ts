import { recipe, style } from "../vanilla-extract";

export const skeleton = recipe({
  base: style({
    selectors: {
      "&:empty:before": { content: '"\\00a0"' },
    },
  }),
});
