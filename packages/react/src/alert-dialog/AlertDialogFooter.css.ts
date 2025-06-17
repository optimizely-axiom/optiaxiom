import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const footer = recipe({
  base: [
    {
      bg: "bg.default",
      flexDirection: "row",
      gap: "16",
      justifyContent: "flex-end",
      px: "24",
      py: "20",
    },
    style({
      borderTop: `1px solid ${theme.colors["border.secondary"]}`,
      bottom: "0",
      position: "sticky",
    }),
  ],
});
