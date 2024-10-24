import { theme } from "@optiaxiom/globals";

import * as styles from "../table-row/TableRow.css";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

const row = styles.className;

export const cell = recipe({
  base: [
    {
      borderColor: "border.tertiary",
      borderT: "1",
      color: "fg.secondary",
      fontSize: "md",
      fontWeight: "400",
      p: "md",
      transition: "colors",
    },
    style({
      verticalAlign: "middle",
      wordBreak: "break-word",

      selectors: {
        [`${row}:hover &`]: {
          backgroundColor: theme.colors["bg.secondary"],
        },
      },
    }),
  ],
});
