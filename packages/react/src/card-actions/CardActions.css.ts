import * as overflowStyles from "../card-overflow/CardOverflow.css";
import * as rootStyles from "../card/Card.css";
import { recipe, style } from "../vanilla-extract";

export const actions = recipe({
  base: [
    {
      display: "flex",
      justifyContent: "space-between",
    },
    style({
      opacity: "0",
      transition: "opacity 150ms ease 250ms",

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`${rootStyles.className}:hover &`]: {
              opacity: "1",
              transition: "none",
            },
          },
        },
      },

      selectors: {
        [`${overflowStyles.className} &`]: {
          inset: "0",
          padding: "16px",
          position: "absolute",
        },
        [`${rootStyles.className}:focus-within &, &:has(:checked, [data-state=open])`]:
          {
            opacity: "1",
            transition: "none",
          },
      },
    }),
  ],
});
