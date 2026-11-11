import { theme } from "@optiaxiom/globals";

import * as tableStyles from "../table/Table.css";
import * as styles from "../table/TableRow.css";
import { rem } from "../utils";
import {
  createVar,
  fallbackVar,
  getVarName,
  recipe,
  style,
} from "../vanilla-extract";

const row = styles.className;
const table = tableStyles.className;

export const cellSizeVar = createVar();
export const cellOffsetVar = createVar();
export const leftTotalSizeVar = createVar();
export const rightTotalSizeVar = createVar();
export const totalSizeVar = createVar();
export const visibleWidthVar = createVar();

const bgHoverColor = createVar({
  inherits: false,
  initialValue: "transparent",
  syntax: "<color>",
});

export const root = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      maxW: "full",
      overflow: "hidden",
      rounded: "lg",
    },
    style({
      position: "relative",

      selectors: {
        "&[data-scroll-timeline]::after": {
          backgroundImage:
            "linear-gradient(to left, rgb(0 0 0 / 0.1), transparent)",
          right: rightTotalSizeVar,
        },
        "&[data-scroll-timeline]::before": {
          backgroundImage:
            "linear-gradient(to right, rgb(0 0 0 / 0.1), transparent)",
          left: leftTotalSizeVar,
        },
        "&[data-scroll-timeline]::before, &[data-scroll-timeline]::after": {
          content: "",
          display: "block",
          height: "100%",
          opacity: 0,
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          transition: "0.3s opacity",
          width: rem("16px"),
          zIndex: 1,
        },
        '&[data-scroll-timeline]:not([data-scroll-timeline="left"])::before': {
          opacity: 1,
        },
        '&[data-scroll-timeline]:not([data-scroll-timeline="right"])::after': {
          opacity: 1,
        },
        /**
         * The root's `overflow: hidden` clips the table's own focus ring, so
         * draw it here instead.
         */
        [`&:has(> ${table}:focus-visible)`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "2px",
        },
      },
    }),
  ],
});

export const cell = recipe({
  base: [
    {
      alignItems: "start",
      display: "flex",
    },
    style({
      width: `calc(1px * ${cellSizeVar})`,
    }),
  ],
  variants: {
    pinned: {
      left: style({
        left: cellOffsetVar,
      }),
      right: style({
        right: cellOffsetVar,
      }),
    },
    pinnedType: {
      body: style({
        backgroundColor: theme.colors["bg.default"],
        backgroundImage: `linear-gradient(${bgHoverColor}, ${bgHoverColor})`,
        transition: `${getVarName(bgHoverColor)} ${theme.duration.sm} ease`,

        "@media": {
          "(hover: hover)": {
            selectors: {
              [`${row}:hover &`]: {
                vars: {
                  [bgHoverColor]: theme.colors["bg.default.hovered"],
                },
              },
              [`${row}[data-selected]:hover &`]: {
                vars: {
                  [bgHoverColor]: `
                    color-mix(
                      in srgb,
                      ${theme.colors["bg.accent.subtle"]},
                      ${theme.colors["bg.accent.light"]} 15%
                    )
                  `,
                },
              },
            },
          },
        },
        selectors: {
          [`${row}[data-selected] &`]: {
            vars: {
              [bgHoverColor]: theme.colors["bg.accent.subtle"],
            },
          },
        },
      }),
      header: {},
    },
    resizable: {
      false: {},
      true: style({
        flexGrow: `calc(${cellSizeVar} / ${totalSizeVar})`,
      }),
    },
  },
});

export const emptyRow = recipe({
  base: [
    {
      display: "flex",
    },
    style({
      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    }),
  ],
});

/**
 * Sized to the scroll container and stuck to its left edge so the message
 * stays in view when the header is wider than the table.
 */
export const empty = recipe({
  base: [
    {
      alignItems: "center",
      color: "fg.tertiary",
      display: "flex",
      flexDirection: "column",
      fontSize: "md",
      justifyContent: "center",
      p: "16",
    },
    style({
      left: 0,
      position: "sticky",
      width: fallbackVar(visibleWidthVar, "100%"),
    }),
  ],
});
