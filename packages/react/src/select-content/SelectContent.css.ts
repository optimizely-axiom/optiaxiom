import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "surface",
      border: "1",
      borderColor: "border.secondary",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      p: "4",
      rounded: "md",
      shadow: "md",
      z: "popover",
    },
    style({
      maxHeight: "var(--radix-select-content-available-height)",
      minWidth: "var(--radix-select-trigger-width)",
    }),
  ],
});
