import * as styles from "../table-row/TableRow.css";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

const row = styles.className;

export const cell = recipe({
  base: [
    {
      borderColor: "border.tertiary",
      p: "16",
    },
    style({
      verticalAlign: "middle",
      wordBreak: "break-word",

      selectors: {
        [`${row}:not(:first-child) &`]: {
          borderTopWidth: "1px",
        },
      },
    }),
  ],
});
