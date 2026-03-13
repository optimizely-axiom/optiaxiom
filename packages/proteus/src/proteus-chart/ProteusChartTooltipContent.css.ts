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
      px: "8",
      py: "10",
      rounded: "lg",
      shadow: "lg",
    },
    style({
      minWidth: "128px",
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
