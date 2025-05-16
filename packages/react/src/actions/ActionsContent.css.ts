import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";
import * as rootStyles from "./ActionsRoot.css";

export const content = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
    },
    style({
      transition: `opacity ${theme.duration.sm} ease`,

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`${rootStyles.className}:not(:has(${rootStyles.className})):hover &`]:
              {
                opacity: "1",
                transition: "none",
              },
          },
        },
      },

      selectors: {
        [`${rootStyles.className}:not(:has(${rootStyles.className})):focus-within &, &:has(:checked, [data-state=open])`]:
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
