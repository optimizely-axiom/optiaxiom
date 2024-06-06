import { style } from "../vanilla-extract";

export const base = style({
  selectors: {
    "&:empty:before": { content: '"\\00a0"' },
  },
});
