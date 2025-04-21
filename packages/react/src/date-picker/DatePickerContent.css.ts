import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const panels = recipe({
  base: [
    {
      alignItems: "stretch",
      flexDirection: "row",
      gap: "0",
    },
    style({
      transition: `height ${theme.duration.sm} ease`,
    }),
  ],
});
