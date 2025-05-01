import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const date = recipe({
  base: marker,
});

export const input = recipe({
  base: style({
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
});

export const picker = recipe({
  base: style({
    "@supports": {
      "not selector(::-webkit-datetime-edit)": {
        display: "none !important",
      },
    },
  }),
});

export const clear = recipe({
  base: [
    {
      size: "sm",
    },
    style({
      selectors: {
        [`${marker}:is(:not(:focus-within):not(:hover), :has(input:disabled)) &`]:
          {
            visibility: "hidden",
          },
      },
    }),
  ],
});
