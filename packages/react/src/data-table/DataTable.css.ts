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
      zIndex: "20",
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
        zIndex: "20",
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
        zIndex: "10",
      }),
      right: {},
    },
  },
});
