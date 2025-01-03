import * as styles from "../toggle-input/ToggleInput.css";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

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
      border: "1",
      p: "2",
      rounded: "full",
      size: "2xs",
    },
    style({
      borderColor: styles.controlColorVar,
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
      rounded: "inherit",
      size: "full",
      transition: "transform",
    },
    style({
      backgroundColor: styles.controlColorVar,
      transform: "scale(0)",

      selectors: {
        [`${marker}:has(${inputMarker}:checked) &`]: {
          transform: "scale(1)",
        },
      },
    }),
  ],
});
