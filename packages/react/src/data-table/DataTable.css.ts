import { createVar, recipe, style } from "../vanilla-extract";

export const columnWidth = createVar();
export const pinnedLeft = createVar();

export const tableHead = recipe({
  base: [
    style({
      width: columnWidth,
    }),
  ],
  variants: {
    pinned: {
      left: style({
        left: pinnedLeft,
        position: "sticky",
        zIndex: 100000,
      }),
    },
  },
});

export const tableCell = recipe({
  base: [
    style({
      width: columnWidth,
    }),
  ],
  variants: {
    pinned: {
      left: style({
        left: pinnedLeft,
        opacity: "1",
        position: "sticky",
        zIndex: 10000,
      }),
    },
  },
});
