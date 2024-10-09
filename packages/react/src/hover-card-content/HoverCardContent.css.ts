import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "bg.default",
      border: "1",
      borderColor: "border.secondary",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      p: "sm",
      rounded: "lg",
      shadow: "md",
      z: "popover",
    },
    style({
      minWidth: "var(--radix-hover-card-trigger-width)",
      position: "relative",
    }),
  ],
});
