import { theme } from "@optiaxiom/globals";

import * as rootStyles from "../actions-root/ActionsRoot.css";
import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      display: "flex",
      justifyContent: "space-between",
    },
    style({
      opacity: "0",
      transition: `opacity ${theme.duration.sm} ease`,

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
        [`${rootStyles.className}:focus-within &, &:has(:checked, [data-expanded], [data-state=open])`]:
          {
            opacity: "1",
            transition: "none",
          },
      },
    }),
  ],
});
