import { recipe, style } from "../vanilla-extract";

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
