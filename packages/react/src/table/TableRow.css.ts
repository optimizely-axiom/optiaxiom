import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const className = style({});

/**
 * The background token for each `data-intent`. `primary` is the selected
 * color's own token. An intent takes the place of the selected color and of
 * the hover color.
 */
export const intents = {
  primary: "accent",
} as const;

export const row = recipe({
  base: [
    className,
    {
      transition: "colors",
      w: "full",
    },
    style({
      position: "relative",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:not([data-intent]):hover": {
              backgroundColor: theme.colors["bg.default.hovered"],
            },
            "&[data-selected]:not([data-intent]):hover": {
              backgroundColor: `
                color-mix(
                  in srgb,
                  ${theme.colors["bg.accent.subtle"]},
                  ${theme.colors["bg.accent.light"]} 15%
                )
              `,
            },
          },
        },
      },
      selectors: {
        "&[data-focus-visible]:focus-visible": {
          outline: "none",
          zIndex: "10",
        },
        "&[data-focus-visible]:focus-visible::before": {
          border: `2px solid ${theme.colors["border.focus"]}`,
          borderRadius: theme.borderRadius.md,
          content: "",
          inset: "1px 0 0",
          position: "absolute",
        },
        "&[data-selected]": {
          backgroundColor: theme.colors["bg.accent.subtle"],
        },
        ...Object.fromEntries(
          Object.entries(intents).map(([intent, color]) => [
            `&[data-intent="${intent}"]`,
            { backgroundColor: theme.colors[`bg.${color}.subtle`] },
          ]),
        ),
      },
    }),
  ],
});
