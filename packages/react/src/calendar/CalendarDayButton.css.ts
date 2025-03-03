import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";

const bgVar = createVar();

export const button = recipe({
  base: [
    {
      color: "fg.default",
      fontSize: "md",
      mt: "8",
      rounded: "md",
      size: "md",
      transition: "colors",
    },
    style({
      backgroundColor: bgVar,
      position: "relative",
      userSelect: "none",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover": {
              backgroundColor: `color-mix(in srgb, ${bgVar}, ${theme.colors["bg.default.inverse"]} 8%)`,
            },
          },
        },
      },

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
          zIndex: "10",
        },
      },
    }),
  ],

  variants: {
    appearance: {
      default: style({
        vars: {
          [bgVar]: theme.colors["bg.default"],
        },
      }),
      holiday: [
        {
          color: "fg.error",
        },
        style({
          vars: {
            [bgVar]: theme.colors["bg.error.subtlest"],
          },
        }),
      ],
      selected: [
        {
          color: "fg.white",
        },
        style({
          vars: {
            [bgVar]: theme.colors["bg.accent"],
          },
        }),
      ],
      weekend: style({
        vars: {
          [bgVar]: theme.colors["bg.secondary"],
        },
      }),
    },
    outside: {
      false: {},
      true: style({
        opacity: 0.6,
      }),
    },
  },
});

export const today = recipe({
  base: [
    {
      bg: "current",
      mx: "auto",
      rounded: "full",
    },
    style({
      bottom: 6,
      height: 2,
      insetInline: 0,
      opacity: 0.8,
      position: "absolute",
      width: 6,
    }),
  ],
});
