import { theme } from "../styles";
import * as styles from "../table-row/TableRow.css";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

const row = styles.className;

export const cell = recipe({
  base: [
    {
      borderColor: "border.tertiary",
      color: "fg.secondary",
      fontSize: "md",
      fontWeight: "500",
      p: "16",
    },
    style({
      borderBottomWidth: "1px",
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
