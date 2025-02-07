import * as styles from "../card/Card.css";
import { recipe, style } from "../vanilla-extract";

export const root = recipe({
  base: [
    {
      transition: "opacity",
    },
    style({
      left: "16px",
      opacity: "0",
      position: "absolute",
      top: "16px",

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
        [`${styles.className}:focus-within &, &:has(:checked)`]: {
          opacity: "1",
        },
      },
    }),
  ],
});
