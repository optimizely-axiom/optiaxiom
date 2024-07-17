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
      border: "1",
      color: "white",
      rounded: "xs",
      size: "16",
    },
    style({
      borderColor: styles.controlColorVar,

      selectors: {
        '&:not([data-state="unchecked"])': {
          backgroundColor: styles.controlColorVar,
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
      size: "full",
    },
    style({
      padding: "1px",
    }),
  ],
});
