import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";

export const borderRadiusVar = createVar();

export const card = recipe({
  base: [
    {
      border: "1",
      color: "fg.default",
      gap: "12",
      p: "16",
    },
    style({
      vars: {
        [borderRadiusVar]: theme.borderRadius.lg,
      },

      borderRadius: borderRadiusVar,
      position: "relative",

      //   selectors: {
      //     "&:focus-visible": {
      //       outline: `2px solid ${theme.colors["border.focus"]}`,
      //       outlineOffset: "1px",
      //     },
      //   },
    }),
  ],
});
