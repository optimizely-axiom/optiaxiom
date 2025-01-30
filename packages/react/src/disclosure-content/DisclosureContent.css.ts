import { recipe, style } from "../vanilla-extract";

export const outer = recipe({
  base: [
    {
      display: "grid",
    },
    style({
      gridTemplateRows: "1fr",
    }),
  ],
});

export const inner = recipe({
  base: [
    style({
      minHeight: 0,
    }),
  ],
});
