import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";
import * as styles from "./ToggleInput.css";
import * as inputStyles from "./ToggleInputHiddenInput.css";

export const control = recipe({
  base: [
    style({
      anchorName: inputStyles.controlAnchor,

      selectors: {
        [`${styles.className}:has(:focus-visible) &`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "2px",
        },

        [`${styles.className}:has(input:disabled) &`]: {
          opacity: 0.3,
        },
      },
    }),
  ],
});
