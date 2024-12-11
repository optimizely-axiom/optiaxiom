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
const translateVar = createVar();

export const floating = recipe({
  base: [
    {
      display: "inline-flex",
      pointerEvents: "none",
      z: "10",
    },
    style({
      vars: {
        [offsetVar]: "2px",
        [translateVar]: "50%",
      },

      position: "absolute",
      right: offsetVar,
    }),
  ],

  variants: {
    offset: {
      false: style({
        vars: {
          [offsetVar]: "0",
          [translateVar]: "0",
        },
      }),
      true: {},
    },
    position: {
      "bottom-right": style({
        bottom: offsetVar,
        transform: `translate(${translateVar}, ${translateVar})`,
      }),
      "top-right": style({
        top: offsetVar,
        transform: `translate(${translateVar}, calc(-1 * ${translateVar}))`,
      }),
    },
  },
});

export const badge = recipe({
  base: style({
    position: "relative",
    userSelect: "none",

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
          px: "4",
          py: "0",
        },
        style({
          selectors: {
            "&:not(:empty)": {
              minWidth: "16px",
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
          pointerEvents: "none",
        },
        style({
          position: "absolute",
        }),
      ],
    },
  },
});
