import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const root = recipe({
  base: [
    {
      bg: "bg.default",
      borderColor: "border.secondary",
      borderL: "1",
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
      h: "full",
      overflow: "auto",
    },
    style({
      borderBottomLeftRadius: theme.borderRadius.lg,
      borderTopLeftRadius: theme.borderRadius.lg,

      selectors: {
        "&:focus-visible": {
          outline: "none",
        },
      },
    }),
  ],
});
