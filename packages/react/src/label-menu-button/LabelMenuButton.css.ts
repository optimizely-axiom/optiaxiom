import * as styles from "../button/ButtonRoot.css";
import { recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: [
    {
      justifyContent: "space-between",
    },
    style({
      vars: {
        [styles.paddingInlineVar]: "8px",
      },

      minWidth: "0",
    }),
  ],
});

export const content = recipe({
  base: [
    {
      fontSize: "sm",
      transition: "all",
    },
  ],

  variants: {
    filled: {
      false: {
        h: "0",
      },
      true: {
        h: "16",
      },
    },
  },
});

export const label = recipe({
  base: [
    {
      color: "fg.secondary",
      cursor: "pointer",
      maxW: "full",
      transition: "all",
    },
  ],

  variants: {
    filled: {
      false: {
        fontSize: "md",
      },
      true: {
        fontSize: "xs",
      },
    },
  },
});
