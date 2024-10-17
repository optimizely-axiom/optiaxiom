import { theme } from "@optiaxiom/globals";

import * as styles from "../button/Button.css";
import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      fontWeight: "500",
      textAlign: "start",
    },
    style({
      vars: {
        [styles.subtleTextColorVar]: theme.colors["fg.secondary"],
      },
    }),
  ],
});
