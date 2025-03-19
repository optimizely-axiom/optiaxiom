import { theme } from "@optiaxiom/globals";

import { createVar, fallbackVar, recipe, style } from "../vanilla-extract";

const bgVar = createVar();

export const button = recipe({
  base: [
    {
      color: "fg.default",
      fontSize: "md",
      size: "md",
      transition: "colors",
    },
    style({
      backgroundColor: bgVar,
      borderRadius: theme.borderRadius.md,
      position: "relative",
      userSelect: "none",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:not([disabled]):hover": {
              backgroundColor: `
                color-mix(
                  in srgb,
                  ${fallbackVar(bgVar, "transparent")},
                  ${theme.colors["bg.default.inverse"]} 8%
                )
              `,
            },
            "&:not([disabled]):hover:active": {
              backgroundColor: `
                color-mix(
                  in srgb,
                  ${fallbackVar(bgVar, "transparent")},
                  ${theme.colors["bg.default.inverse"]} 16%
                )
              `,
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
        "&:is([data-disabled], [disabled])": {
          opacity: 0.32,
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
      range_middle: style({
        vars: {
          [bgVar]: theme.colors["bg.secondary"],
        },
      }),
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
      weekend: [
        {
          color: "fg.tertiary",
        },
        style({
          vars: {
            [bgVar]: theme.colors["bg.page"],
          },
        }),
      ],
    },
    range: {
      end: [
        style({
          borderBottomLeftRadius: "0",
          borderTopLeftRadius: "0",
        }),
      ],
      middle: [
        style({
          borderRadius: "0",
        }),
      ],
      start: [
        style({
          borderBottomRightRadius: "0",
          borderTopRightRadius: "0",
        }),
      ],
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
