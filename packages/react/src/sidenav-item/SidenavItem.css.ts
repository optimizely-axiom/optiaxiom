import { theme } from "@optiaxiom/globals";

import * as styles from "../button-base/ButtonBase.css";
import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      fontWeight: "500",
      mx: "xs",
      textAlign: "start",
    },
    style({
      vars: {
        [styles.subtleTextColorVar]: theme.colors["fg.secondary"],
      },
    }),
  ],
});
