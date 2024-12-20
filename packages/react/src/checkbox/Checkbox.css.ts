import { theme } from "@optiaxiom/globals";

import * as styles from "../toggle-input/ToggleInput.css";
import { recipe, style } from "../vanilla-extract";

const marker = style({});
const inputMarker = style({});

export const checkbox = recipe({
  base: marker,
});

export const input = recipe({
  base: inputMarker,
});

export const icon = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        [`${marker}:has(${inputMarker}:checked) &`]: {
          display: "block",
        },
      },
    }),
  ],
});

export const control = recipe({
  base: [
    {
      color: "fg.default.inverse",
      rounded: "xs",
      size: "2xs",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      borderColor: styles.controlColorVar,
      borderWidth: "1px",

      selectors: {
        [`${marker}:has(${inputMarker}:checked) &`]: {
          backgroundColor: styles.controlColorVar,
          borderWidth: "0",
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
