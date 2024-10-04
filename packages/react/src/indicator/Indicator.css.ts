import { createVar, recipe, style } from "../vanilla-extract";

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

const offsetVar = createVar();

export const floating = recipe({
  base: [
    {
      display: "inline-flex",
      z: "10",
    },
    style({
      vars: {
        [offsetVar]: "50%",
      },

      position: "absolute",
      right: 0,
    }),
  ],

  variants: {
    offset: {
      false: style({
        vars: {
          [offsetVar]: "2px",
        },
      }),
      true: {},
    },
    position: {
      "bottom-right": style({
        bottom: 0,
        transform: `translate(${offsetVar}, ${offsetVar})`,
      }),
      "top-right": style({
        top: 0,
        transform: `translate(${offsetVar}, calc(-1 * ${offsetVar}))`,
      }),
    },
  },
});

export const badge = recipe({
  base: style({
    position: "relative",

    selectors: {
      "&:empty": {
        aspectRatio: "1",
      },
    },
  }),

  variants: {
    offset: {
      false: {
        px: "0",
        py: "0",
      },
      true: [
        {
          px: "6",
        },
        style({
          selectors: {
            "&:not(:empty)": {
              minWidth: "20px",
            },
          },
        }),
      ],
    },
    ping: {
      false: {},
      true: [
        {
          animation: "ping",
          color: "transparent",
        },
        style({
          position: "absolute",
        }),
      ],
    },
  },
});
