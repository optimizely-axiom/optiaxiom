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
          inset: "-8px",
          position: "absolute",
        },
      },
    }),
  ],
});
