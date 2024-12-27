import { recipe, style } from "../vanilla-extract";

export const code = recipe({
  base: [
    {
      bg: "bg.secondary",
      display: "inline",
      rounded: "sm",
    },
    style({
      fontSize: "0.9em",
      fontVariantLigatures: "none",
      paddingBlock: "0.1em",
      paddingInline: "0.25em",
      WebkitFontSmoothing: "auto",
    }),
  ],
});
