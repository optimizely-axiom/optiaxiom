import { theme } from "@optiaxiom/globals";

import * as rootStyles from "../actions-root/ActionsRoot.css";
import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      display: "flex",
      justifyContent: "space-between",
    },
    style({
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

  variants: {
    visible: {
      false: style({
        opacity: "0",
      }),
      true: style({
        opacity: "1",
      }),
    },
  },
});

export type ContentVariants = RecipeVariants<typeof content>;
