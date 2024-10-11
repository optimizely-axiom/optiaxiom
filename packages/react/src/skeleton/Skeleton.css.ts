import { recipe, style } from "../vanilla-extract";

export const skeleton = recipe({
  base: [
    {
      animation: "pulse",
      bg: "bg.secondary",
      color: "bg.default",
      display: "block",
    },
    style({
      selectors: {
        "&:empty:before": { content: '"\\00a0"' },
      },
    }),
  ],
});
