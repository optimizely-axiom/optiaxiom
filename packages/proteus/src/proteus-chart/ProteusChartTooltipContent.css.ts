import { recipe, style } from "../vanilla-extract";

export const tooltip = recipe({
  base: [
    {
      bg: "bg.default",
      border: "1",
      borderColor: "border.secondary",
      display: "grid",
      fontSize: "sm",
      gap: "6",
      pointerEvents: "none",
      px: "8",
      py: "10",
      rounded: "lg",
      shadow: "lg",
      transition: "all",
    },
    style({
      minWidth: "128px",
      position: "absolute",
    }),
  ],
});

export const value = recipe({
  base: [
    {
      color: "fg.default",
      fontWeight: "500",
    },
    style({
      fontVariantNumeric: "tabular-nums",
    }),
  ],
});
