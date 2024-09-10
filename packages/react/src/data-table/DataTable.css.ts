import { createVar, recipe, style } from "../vanilla-extract";

export const columnWidth = createVar();
export const cellOffset = createVar();

export const tableHeader = recipe({
  base: [
    {
      bg: "white",
    },
    style({
      position: "sticky",
      top: 0,
      zIndex: 2,
    }),
  ],
});

export const tableHead = recipe({
  base: [
    {
      bg: "white",
    },
    style({
      minWidth: columnWidth,
    }),
  ],
  variants: {
    pinned: {
      false: style({}),
      left: style({
        left: cellOffset,
        position: "sticky",
        zIndex: 2,
      }),
      right: style({}),
    },
  },
});

export const tableCell = recipe({
  base: [
    {
      bg: "white",
    },
    style({
      minWidth: columnWidth,
    }),
  ],
  variants: {
    pinned: {
      false: style({}),
      left: style({
        left: cellOffset,
        position: "sticky",
        zIndex: 1,
      }),
      right: style({}),
    },
  },
});
