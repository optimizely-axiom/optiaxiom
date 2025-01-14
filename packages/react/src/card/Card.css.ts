import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";

export const borderRadiusVar = createVar();

export const card = recipe({
  base: [
    {
      alignItems: "start",
      border: "1",
      borderColor: "border.tertiary",
      flexDirection: "column",
      gap: "0",
      p: "16",
    },
    style({
      vars: {
        [borderRadiusVar]: theme.borderRadius.lg,
      },

      borderRadius: borderRadiusVar,
      maxHeight: "180px",
      maxWidth: "300px",
      position: "relative",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover:not(:active, [data-disabled], [data-loading])": {
              background: theme.colors["bg.default.hovered"],
            },
          },
        },
      },

      //   selectors: {
      //     "&:focus-visible": {
      //       outline: `2px solid ${theme.colors["border.focus"]}`,
      //       outlineOffset: "1px",
      //     },
      //   },
    }),
  ],
});
