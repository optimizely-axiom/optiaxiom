import { theme } from "../styles";
import * as styles from "../table-row/TableRow.css";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

const row = styles.row().className;

export const cell = recipe({
  base: [
    {
      p: "12",
    },
    style({
      ":last-of-type": {
        borderRight: "0",
      },
      backgroundColor: "white",
      borderBottom: `1px solid ${theme.colors["gray.200"]}`,
      borderRight: `1px solid ${theme.colors["gray.200"]}`,
      color: theme.colors["gray.600"],
      verticalAlign: "middle",
      wordBreak: "break-word",

      selectors: {
        [`${row}:hover &`]: {
          backgroundColor: theme.colors["gray.100"],
        },
        [`${row}:last-child &`]: {
          borderBottom: "0",
        },
      },
    }),
  ],
});
