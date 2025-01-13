import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const cell = recipe({
  base: style({
    position: "relative",
    textAlign: "start",
  }),
});

export const content = recipe({
  base: [
    {
      alignItems: "center",
      bg: "bg.default",
      color: "fg.tertiary",
      display: "flex",
      fontSize: "sm",
      fontWeight: "400",
      h: "full",
      px: "16",
      py: "12",
    },
    style({
      boxShadow: `0 1px 0 ${theme.colors["border.default"]}`,
    }),
  ],
});
