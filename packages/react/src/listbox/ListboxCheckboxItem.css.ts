import { rem } from "../utils";
import { recipe, style } from "../vanilla-extract";

export const checkbox = recipe({
  base: [
    {
      display: "inline-flex",
    },
    style({
      position: "relative",

      selectors: {
        "&::before": {
          content: "",
          inset: rem("-8px"),
          position: "absolute",
        },
      },
    }),
  ],
});
