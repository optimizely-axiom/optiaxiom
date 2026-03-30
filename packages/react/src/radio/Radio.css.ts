import { theme } from "@optiaxiom/globals";

import * as styles from "../toggle-input/ToggleInput.css";
import { recipe, style } from "../vanilla-extract";

const marker = style({});
const inputMarker = style({});

export const radio = recipe({
  base: marker,
});

export const input = recipe({
  base: inputMarker,
});

export const control = recipe({
  base: [
    {
      bg: "bg.default",
      display: "grid",
      rounded: "full",
      size: "sm",
    },
    style({
      borderColor: styles.controlColorVar,
      borderWidth: "2px",
      placeContent: "center",
      transitionDuration: theme.duration.sm,
      transitionProperty: "border-width",
      transitionTimingFunction: "ease",

      selectors: {
        [`${marker}:has(${inputMarker}:checked, ${inputMarker}:indeterminate) &`]:
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
        marginTop: "-2px",
      }),
    },
  },
});

export const indicator = recipe({
  base: [
    {
      rounded: "inherit",
      transition: "transform",
    },
    style({
      backgroundColor: theme.colors["fg.default"],
      height: "8px",
      transform: "scale(0)",
      width: "8px",

      selectors: {
        [`${marker}:has(${inputMarker}:checked) &`]: {
          transform: "scale(1)",
        },
      },
    }),
  ],
});
