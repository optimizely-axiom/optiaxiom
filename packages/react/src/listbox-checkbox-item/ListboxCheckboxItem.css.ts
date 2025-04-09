import { recipe, style } from "../vanilla-extract";

export const checkbox = recipe({
  base: [
    {
      display: "inline-flex",
      transition: "opacity",
    },
    style({
      opacity: 0,
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

  variants: {
    visible: {
      false: {},
      true: style({
        opacity: 1,
      }),
    },
  },
});
