import { recipe, style } from "../vanilla-extract";

export const listbox = recipe({
  base: [
    {
      display: "flex",
      flex: "1",
      flexDirection: "column",
      gap: "2",
      overflow: "auto",
    },
    style({
      overscrollBehavior: "contain",
    }),
  ],
});
