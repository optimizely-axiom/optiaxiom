import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      gap: "4",
      justifyContent: "flex-start",
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

export const handle = recipe({
  base: [
    {
      h: "full",
      z: "10",
    },
    style({
      borderLeftWidth: 3,
      cursor: "col-resize",
      position: "absolute",
      right: "0",
      top: "0",
      touchAction: "none",
      userSelect: "none",
    }),
  ],

  variants: {
    resizing: {
      false: {},
      true: {
        borderColor: "border.focus",
      },
    },
  },
});
