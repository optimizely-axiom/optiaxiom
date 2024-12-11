import { theme } from "@optiaxiom/globals";

import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const footer = recipe({
  base: [
    {
      flexDirection: ["column-reverse", "row"],
      gap: "16",
      justifyContent: "end",
      px: "24",
      py: "20",
    },
    style({
      borderTop: `1px solid ${theme.colors["border.secondary"]}`,
    }),
  ],
});
