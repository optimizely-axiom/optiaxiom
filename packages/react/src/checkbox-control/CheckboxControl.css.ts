import { theme } from "@optiaxiom/globals";

import * as inputStyles from "../toggle-input-hidden-input/ToggleInputHiddenInput.css";
import * as rootStyles from "../toggle-input/ToggleInput.css";
import { recipe, style } from "../vanilla-extract";

export const icon = recipe({
  base: [
    {
      transition: "all",
    },
    style({
      clipPath: "inset(100% 0 0 0)",
      transitionDelay: "125ms",

      selectors: {
        [`${rootStyles.className}:has(${inputStyles.className}:checked) &`]: {
          clipPath: "inset(0 0 0 0)",
        },
      },
    }),
  ],
});

export const control = recipe({
  base: [
    {
      color: "fg.default.inverse",
      display: "grid",
      rounded: "xs",
      size: "2xs",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      borderColor: rootStyles.controlColorVar,
      borderWidth: "1px",
      placeContent: "center",
      transitionDuration: "150ms",
      transitionProperty: "border-width",
      transitionTimingFunction: "ease",

      selectors: {
        [`${rootStyles.className}:has(${inputStyles.className}:checked) &`]: {
          borderWidth: "8px",
        },
      },
    }),
  ],

  variants: {
    shift: {
      false: {},
      true: {
        mt: "2",
      },
    },
  },
});

export const indicator = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      p: "2",
      size: "full",
    },
  ],
});
