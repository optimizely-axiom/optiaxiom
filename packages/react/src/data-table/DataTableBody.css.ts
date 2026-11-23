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
              [`${row}:not([data-intent]):not([data-selected]):hover &`]: {
                vars: {
                  [bgHoverColor]: theme.colors["bg.default.hovered"],
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
          ...Object.fromEntries(
            Object.entries(styles.intents).map(([intent, color]) => [
              `${row}[data-intent="${intent}"] &`,
              { vars: { [bgHoverColor]: theme.colors[`bg.${color}.subtle`] } },
            ]),
          ),
        },
      }),
      header: {},
    },
    resizable: {
      false: {},
      /**
       * Grow weights, not shares of 1: once a column reaches its `max-width`,
       * flexbox only hands its leftover to the other columns while their
       * weights still sum to at least 1.
       */
      true: style({
        flexGrow: cellSizeVar,
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
