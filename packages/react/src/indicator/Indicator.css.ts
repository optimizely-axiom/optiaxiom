import { recipe, style } from "../vanilla-extract";

export const indicator = recipe({
  base: [
    {
      display: "inline-flex",
    },
    style({
      position: "relative",
    }),
  ],
});

export const floating = recipe({
  base: [
    {
      display: "inline-flex",
      z: "10",
    },
    style({
      position: "absolute",
      right: 0,
    }),
  ],

  variants: {
    align: {
      end: style({
        bottom: 0,
        transform: "translate(50%, 50%)",
      }),
      start: style({
        top: 0,
        transform: "translate(50%, -50%)",
      }),
    },
  },
});

export const badge = recipe({
  base: style({
    position: "relative",
  }),
});
