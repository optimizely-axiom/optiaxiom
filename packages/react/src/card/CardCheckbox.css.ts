import { recipe, style } from "../vanilla-extract";

export const checkbox = recipe({
  base: [
    style({
      position: "relative",

      selectors: {
        "&::before": {
          content: "",
          inset: "-8px",
          position: "absolute",
        },
      },
    }),
  ],
});
