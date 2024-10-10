import * as styles from "../control-base/ControlBase.css";
import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const iconChecked = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        [`${marker}[data-state="checked"] &`]: {
          display: "block",
        },
      },
    }),
  ],
});

export const iconIndeterminate = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        [`${marker}[data-state="indeterminate"] &`]: {
          display: "block",
        },
      },
    }),
  ],
});

export const checkbox = recipe({
  base: [
    marker,
    {
      color: "neutral.00",
      mt: "2",
      rounded: "xs",
      size: "16",
    },
    style({
      borderColor: styles.controlColorVar,
      borderWidth: "1px",

      selectors: {
        '&:not([data-state="unchecked"])': {
          backgroundColor: styles.controlColorVar,
          borderWidth: "0",
        },
      },
    }),
  ],
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
