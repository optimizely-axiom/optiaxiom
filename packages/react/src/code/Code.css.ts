import { recipe, style } from "../vanilla-extract";

export const code = recipe({
  base: [
    {
      bg: "bg.secondary",
      display: "inline-block",
      px: "4",
      rounded: "sm",
    },
    style({
      fontSize: "0.875em",
      WebkitFontSmoothing: "auto",
    }),
  ],
});
