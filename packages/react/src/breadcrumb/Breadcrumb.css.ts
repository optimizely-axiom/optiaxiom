import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const list = recipe({
  base: [
    {
      alignItems: "center",
      color: "fg.default",
      display: "flex",
      fontSize: "md",
      gap: "8",
    },
    style({
      minHeight: theme.size.md,
    }),
  ],
});
