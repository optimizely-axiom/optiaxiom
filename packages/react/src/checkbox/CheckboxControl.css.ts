import { theme } from "@optiaxiom/globals";

import * as rootStyles from "../toggle-input/ToggleInput.css";
import * as inputStyles from "../toggle-input/ToggleInputHiddenInput.css";
import { recipe, style } from "../vanilla-extract";

export const icon = recipe({
  base: [
    {
      transition: "all",
    },
    style({
      clipPath: "inset(100% 0 0 0)",
      transitionDelay: `calc(0.8 * ${theme.duration.sm})`,

      selectors: {
        [`${rootStyles.className}:has(${inputStyles.className}:checked, ${inputStyles.className}:indeterminate) &`]:
          {
            clipPath: "inset(0 0 0 0)",
          },
      },
    }),
  ],
});

export const control = recipe({
  base: [
    {
      color: "fg.dark",
      display: "grid",
      rounded: "md",
      size: "sm",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      borderColor: rootStyles.controlColorVar,
      borderWidth: "2px",
      placeContent: "center",
      transitionDuration: theme.duration.sm,
      transitionProperty: "border-width",
      transitionTimingFunction: "ease",

      selectors: {
        [`${rootStyles.className}:has(${inputStyles.className}:checked, ${inputStyles.className}:indeterminate) &`]:
          {
            borderWidth: "12px",
          },
      },
    }),
  ],

  variants: {
    shift: {
      false: {},
      true: style({
        marginBlock: "-2px",
      }),
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
