import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";

export const columnWidthVar = createVar();
export const cellOffsetVar = createVar();

export const tableHeader = recipe({
  base: [
    {
      bg: "bg.default",
    },
    style({
      position: "sticky",
      top: 0,
      zIndex: theme.zIndex["20"],
    }),
  ],
});

export const tableHead = recipe({
  base: [
    {
      bg: "bg.default",
    },
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
        zIndex: theme.zIndex["20"],
      }),
      right: {},
    },
  },
});

export const tableCell = recipe({
  base: [
    {
      bg: "bg.default",
    },
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
        zIndex: theme.zIndex["10"],
      }),
      right: {},
    },
  },
});
