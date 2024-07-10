import { recipe, style } from "../vanilla-extract";

export const code = recipe({
  base: [
    {
      bg: "bg.neutral",
      display: "inline-block",
      px: "4",
      rounded: "sm",
    },
    style({
      WebkitFontSmoothing: "auto",
      fontSize: "0.875em",
    }),
  ],
});
