import { recipe, style } from "../vanilla-extract";

export const outer = recipe({
  base: [
    {
      display: "grid",
    },
    style({
      gridTemplateColumns: "100%",
      gridTemplateRows: "1fr",
      transitionProperty: "grid-template-rows, opacity, scale, transform",

      selectors: {
        "&[data-transition-state]": {
          gridTemplateRows: "0fr",
        },
      },
    }),
  ],

  variants: {
    scale: {
      false: style({
        selectors: {
          "&[data-transition-state]": {
            scale: 1,
          },
        },
      }),
      true: {},
    },
  },
});

export const inner = recipe({
  base: [
    style({
      minHeight: 0,
    }),
  ],
});
