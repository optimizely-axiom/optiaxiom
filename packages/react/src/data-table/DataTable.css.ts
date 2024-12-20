import { theme } from "@optiaxiom/globals";

import * as styles from "../table-row/TableRow.css";
import { createVar, recipe, style } from "../vanilla-extract";

const row = styles.className;

export const cellSizeVar = createVar();
export const cellOffsetVar = createVar();
export const leftTotalSizeVar = createVar();
export const rightTotalSizeVar = createVar();

const shadowSize = "1px";
const backgrounds = [
  /**
   * Left vertical shadow overlay
   *
   * To hide the vertical shadow until scrolled.
   */
  {
    attachment: "local",
    image: `
      linear-gradient(
        to right,
        ${theme.colors["bg.default"]} 30%,
        transparent
      )
    `,
    position: `${leftTotalSizeVar} 0`,
    size: `calc(3 * ${shadowSize}) 100%`,
  },
  /**
   * Left vertical shadow
   */
  {
    attachment: "scroll",
    image: `
      linear-gradient(
        to right,
        ${theme.colors["border.tertiary"]} 1px,
        transparent 1px
      )
    `,
    position: `${leftTotalSizeVar} 0`,
    size: `${shadowSize} 100%`,
  },

  /**
   * Right vertical shadow overlay
   *
   * To hide the vertical shadow until scrolled.
   */
  {
    attachment: "local",
    image: `
      linear-gradient(
        to right,
        transparent,
        ${theme.colors["bg.default"]} 70%
      )
    `,
    position: `calc(100% - ${rightTotalSizeVar}) 0`,
    size: `calc(3 * ${shadowSize}) 100%`,
  },
  /**
   * Right vertical shadow
   */
  {
    attachment: "scroll",
    image: `
      linear-gradient(
        to left,
        ${theme.colors["border.tertiary"]} 1px,
        transparent 1px
      )
    `,
    position: `calc(100% - ${rightTotalSizeVar}) 0`,
    size: `${shadowSize} 100%`,
  },
];
export const table = recipe({
  base: style({
    background: backgrounds.map((bg) => bg.image).join(", "),
    backgroundAttachment: backgrounds.map((bg) => bg.attachment).join(", "),
    backgroundPosition: backgrounds.map((bg) => bg.position).join(", "),
    backgroundRepeat: "no-repeat",
    backgroundSize: backgrounds.map((bg) => bg.size).join(", "),
  }),
});

export const header = recipe({
  base: [
    style({
      position: "sticky",
      top: 0,
      zIndex: "20",
    }),
  ],
});

export const cell = recipe({
  base: [
    style({
      width: cellSizeVar,
    }),
  ],
  variants: {
    pinned: {
      left: style({
        left: cellOffsetVar,
        position: "sticky",
        zIndex: "10",
      }),
      right: style({
        position: "sticky",
        right: cellOffsetVar,
        zIndex: "10",
      }),
    },
    pinnedType: {
      body: style({
        backgroundColor: theme.colors["bg.default"],

        selectors: {
          [`${row}:hover &`]: {
            backgroundImage: `
              linear-gradient(
                ${theme.colors["bg.default.hovered"]},
                ${theme.colors["bg.default.hovered"]}
              )
            `,
          },
        },
      }),
      header: {},
    },
  },
});
