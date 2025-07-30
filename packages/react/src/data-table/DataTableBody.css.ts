import { theme } from "@optiaxiom/globals";

import * as styles from "../table/TableRow.css";
import { createVar, getVarName, recipe, style } from "../vanilla-extract";

const row = styles.className;

export const cellSizeVar = createVar();
export const cellOffsetVar = createVar();
export const leftTotalSizeVar = createVar();
export const rightTotalSizeVar = createVar();
export const totalSizeVar = createVar();

const bgHoverColor = createVar({
  inherits: false,
  initialValue: "transparent",
  syntax: "<color>",
});

export const cell = recipe({
  base: [
    {
      alignItems: "start",
      display: "flex",
    },
    style({
      flexGrow: `calc(${cellSizeVar} / ${totalSizeVar})`,
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
  },
});
