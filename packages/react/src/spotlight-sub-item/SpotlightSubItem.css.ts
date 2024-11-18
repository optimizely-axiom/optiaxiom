import { theme } from "@optiaxiom/globals";

import * as styles from "../badge/Badge.css";
import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      cursor: "pointer",
    },
  ],

  variants: {
    active: {
      false: style({
        selectors: {
          "&[data-highlighted]": {
            vars: {
              [styles.subtleBackgroundColorVar]:
                theme.colors["bg.secondary.hovered"],
            },
          },
        },
      }),
      true: style({
        selectors: {
          "&[data-highlighted]": {
            vars: {
              [styles.solidBackgroundColorVar]:
                theme.colors["fg.information.strong"],
            },
          },
        },
      }),
    },
  },
});
