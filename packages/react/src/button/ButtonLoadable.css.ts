import { recipe, style } from "../vanilla-extract";
import * as styles from "./ButtonRoot.css";

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
