import * as styles from "../control-base/ControlBase.css";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const item = recipe({
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
      display: "block",
      rounded: "inherit",
      size: "full",
    },
    style({
      backgroundColor: styles.controlColorVar,
    }),
  ],
});
