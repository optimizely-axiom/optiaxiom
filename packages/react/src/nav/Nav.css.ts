import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const nav = recipe({
  base: [
    {
      bg: "bg.default",
      flex: "1",
      gap: "0",
      overflow: "hidden",
      pb: "8",
      pt: "16",
    },
    style({
      transition: `width ${theme.duration.md} ease`,
    }),
  ],
});
