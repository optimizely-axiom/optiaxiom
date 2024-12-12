import { theme } from "@optiaxiom/globals";

import { type RecipeVariants, style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const link = recipe({
  base: [
    style({
      textDecoration: "none",

      selectors: {
        "&:focus-visible": {
          outline: `2px auto ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        "&:hover:not([data-disabled])": {
          textDecoration: "underline",
        },
        "&:visited": {
          color: theme.colors["fg.link.visited"],
        },
        "&[data-disabled]": {
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],
  variants: {
    appearance: {
      default: style({
        color: theme.colors["fg.link.default"],

        selectors: {
          "&:hover:not([data-disabled])": {
            color: theme.colors["fg.link.default.hovered"],
          },
        },
      }),
      inverse: style({
        color: theme.colors["fg.link.inverse"],
      }),
      subtle: style({
        color: theme.colors["fg.link.subtle"],
      }),
    },
  },
});

export const icon = recipe({
  base: [
    {
      display: "inline-flex",
      ml: "4",
    },
    style({
      height: "auto",
      width: "0.875em",
    }),
  ],
});

export type LinkVariants = RecipeVariants<typeof link>;
