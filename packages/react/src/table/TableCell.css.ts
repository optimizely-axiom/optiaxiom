import { recipe, style } from "../vanilla-extract";
import * as styles from "./TableRow.css";

const row = styles.className;

export const cell = recipe({
  base: [
    {
      borderColor: "border.tertiary",
      p: "16",
    },
    style({
      position: "relative",
      verticalAlign: "top",
      wordBreak: "break-word",

      selectors: {
        [`${row}:not(:first-child) &`]: {
          borderTopWidth: "1px",
        },
      },
    }),
  ],
});
