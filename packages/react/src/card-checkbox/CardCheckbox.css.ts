import { theme } from "@optiaxiom/globals";

import * as styles from "../card/Card.css";
import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const root = recipe({
  base: [
    marker,
    {
      rounded: "inherit",
      transition: "opacity",
    },
    style({
      inset: "0",
      opacity: "0",
      position: "absolute",

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`${styles.className}:hover &`]: {
              opacity: "1",
            },
          },
        },
      },

      selectors: {
        "&:has(:checked, :focus-visible)": {
          opacity: "1",
        },
        "&:has(:focus-visible)": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
      },
    }),
  ],
});

export const control = recipe({
  base: [
    style({
      left: "16px",
      position: "relative",
      top: "16px",

      selectors: {
        [`${marker}:has(:focus-visible) &`]: {
          outline: "none",
        },
      },
    }),
  ],
});
