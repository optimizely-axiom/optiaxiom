import { theme } from "@optiaxiom/globals";

import * as styles from "../link/Link.css";
import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const card = recipe({
  base: [
    className,
    {
      border: "1",
      color: "fg.default",
      gap: "12",
      p: "16",
    },
    style({
      vars: {
        [styles.borderRadiusVar]: theme.borderRadius.lg,
      },

      borderRadius: theme.borderRadius.lg,
      position: "relative",
    }),
  ],
});
