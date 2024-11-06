import * as styles from "../button-base/ButtonBase.css";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

const marker = styles.className;

export const loadable = recipe({
  base: [
    {
      transition: "opacity" as const,
    },
    style({
      opacity: "1",

      selectors: {
        [`${marker}[data-loading] &`]: {
          opacity: "0",
        },
      },
    }),
  ],
});
