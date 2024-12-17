import { recipe, style } from "../vanilla-extract";

export const skeleton = recipe({
  base: [
    {
      animation: "pulse",
      bg: "bg.avatar.neutral",
      color: "fg.default.inverse",
      display: "block",
    },
    style({
      selectors: {
        "&:empty:before": { content: '"\\00a0"' },
      },
    }),
  ],
});
