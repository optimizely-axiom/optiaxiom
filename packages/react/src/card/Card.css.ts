import { theme } from "@optiaxiom/globals";

import * as coverStyles from "../cover/Cover.css";
import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const card = recipe({
  base: [
    className,
    {
      alignItems: "start",
      bg: "bg.default",
      border: "1",
      borderColor: "border.tertiary",
      color: "fg.default",
      fontSize: "md",
      gap: "8",
      p: "16",
    },
    style({
      vars: {
        [coverStyles.borderRadiusVar]: theme.borderRadius.lg,
      },

      borderRadius: theme.borderRadius.lg,
      position: "relative",
    }),
  ],
});
