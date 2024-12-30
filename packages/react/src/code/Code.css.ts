import { recipe, style } from "../vanilla-extract";

export const code = recipe({
  base: [
    {
      fontWeight: "600",
    },
    style({
      fontSize: "0.9em",
      fontVariantLigatures: "none",
      WebkitFontSmoothing: "auto",

      selectors: {
        "&::after, &::before": {
          content: "`",
        },
      },
    }),
  ],
});
