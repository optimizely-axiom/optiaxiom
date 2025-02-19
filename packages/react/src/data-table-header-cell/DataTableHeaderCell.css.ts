import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      gap: "4",
      justifyContent: "start",
      rounded: "md",
      textAlign: "start",
      transition: "colors",
      w: "full",
    },
    style({
      color: theme.colors["fg.tertiary"],
      textDecoration: "none",
      userSelect: "none",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover": {
              color: theme.colors["fg.secondary"],
            },
          },
        },
      },

      selectors: {
        "&:focus-visible": {
          outline: "none",
          zIndex: "10",
        },
      },
    }),
  ],
});

export const icon = recipe({
  base: [
    {
      h: "12",
      mx: "2",
      transition: "opacity",
    },
    style({
      gridArea: "1 / 1 / 2 / 2",
    }),
  ],

  variants: {
    active: {
      false: style({
        opacity: "0",
      }),
      true: style({
        opacity: "1",
      }),
    },
  },
});
