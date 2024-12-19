import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";

export const columnWidthVar = createVar();
export const cellOffsetVar = createVar();

export const tableHeader = recipe({
  base: [
    style({
      position: "sticky",
      top: 0,
      zIndex: "20",
    }),
  ],
});

export const tableHead = recipe({
  base: [
    style({
      minWidth: columnWidthVar,
    }),
  ],
  variants: {
    pinned: {
      false: {},
      left: style({
        left: cellOffsetVar,
        position: "sticky",
        zIndex: "20",
      }),
      right: {},
    },
  },
});

export const tableCell = recipe({
  base: [
    style({
      minWidth: columnWidthVar,
    }),
  ],
  variants: {
    pinned: {
      false: {},
      left: style({
        backgroundColor: theme.colors["bg.default"],
        left: cellOffsetVar,
        position: "sticky",
        zIndex: "10",
      }),
      right: {},
    },
  },
});
