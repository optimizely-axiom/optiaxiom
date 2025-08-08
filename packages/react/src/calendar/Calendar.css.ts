import { recipe, style } from "../vanilla-extract";

export const picker = recipe({
  variants: {
    side: {
      bottom: {},
      left: {},
      right: {},
      top: style({
        minHeight: "274px",
      }),
    },
  },
});

export const date = recipe({
  base: [
    {
      flex: "none",
      py: "4",
      w: "1/2",
    },
    style({
      selectors: {
        /**
         * Hide browser default icons inside inputs
         */
        "&::-webkit-calendar-picker-indicator": {
          display: "none",
          WebkitAppearance: "none",
        },
      },
    }),
  ],

  variants: {
    position: {
      end: {
        textAlign: "end",
      },
    },
  },
});

export const separator = recipe({
  base: [
    {
      flex: "none",
      textAlign: "center",
    },
    style({
      marginInline: -4,
      width: 8,
    }),
  ],
});
