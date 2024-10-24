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
      mt: "2",
      p: "2",
      rounded: "full",
      size: "16",
    },
    style({
      borderColor: styles.controlColorVar,
    }),
  ],
});

export const indicator = recipe({
  base: [
    {
      rounded: "inherit",
      size: "full",
    },
    style({
      backgroundColor: styles.controlColorVar,
      display: "none",

      selectors: {
        [`${marker}:has(${inputMarker}:checked) &`]: {
          display: "block",
        },
      },
    }),
  ],
});