import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";

const bgVar = createVar();

export const root = recipe({
  base: [
    {
      justifyContent: "center",
      rounded: "sm",
      z: "10",
    },
    style({
      vars: {
        [bgVar]: theme.colors["bg.secondary"],
      },

      marginInline: "-6px",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover": {
              vars: {
                [bgVar]: theme.colors["bg.avatar.neutral"],
              },
            },
          },
        },
      },

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "-2px",
        },
      },
    }),
  ],
});

export const handle = recipe({
  base: [
    {
      border: "1",
      h: "56",
      rounded: "sm",
      w: "12",
    },
    style({
      backgroundColor: bgVar,
    }),
  ],
});
