import { recipe, style } from "../vanilla-extract";

export const outer = recipe({
  base: [
    {
      display: "grid",
    },
    style({
      gridTemplateColumns: "100%",
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
