import { theme } from "@optiaxiom/globals";

import { rem } from "../utils";
import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      gap: "4",
      whiteSpace: "nowrap",
    },
    style({
      maxWidth: rem("160px"),

      selectors: {
        "&:not(:first-child)::before": {
          color: theme.colors["fg.tertiary"],
          content: "/",
          marginRight: rem("4px"),
        },
      },
    }),
  ],
});
