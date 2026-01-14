import { recipe, type RecipeVariants, style } from "../vanilla-extract";
import * as styles from "./TableRow.css";

const row = styles.className;

export const cell = recipe({
  base: [
    {
      borderColor: "border.tertiary",
      p: "16",
    },
    style({
      verticalAlign: "top",
      wordBreak: "break-word",

      selectors: {
        [`${row}:not(:first-child) &`]: {
          borderTopWidth: "1px",
        },
      },
    }),
  ],

  variants: {
    /**
     * Whether to pin the header cell to left/right of table.
     */
    pinned: {
      false: style({
        position: "relative",
      }),
      true: style({
        position: "sticky",
        zIndex: "10",
      }),
    },
  },
});

export type CellVariants = RecipeVariants<typeof cell>;
