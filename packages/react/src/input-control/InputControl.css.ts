import { theme } from "@optiaxiom/globals";

import {
  recipe,
  type RecipeVariants,
  responsiveStyle,
  style,
} from "../vanilla-extract";

export const className = style({});

export const control = recipe({
  base: [
    className,
    {
      bg: "transparent",
      flex: "auto",
      w: "full",
    },
    style({
      /**
       * Explicitly use 16px on mobile because otherwise iOS will zoom in on
       * the page anytime the input is focused
       */
      fontSize: "16px",
      /**
       * Line-height was set to 22px to adjust for the 1px border on top and bottom
       */
      lineHeight: "22px",
      minWidth: "0",
      outline: "2px solid transparent",

      selectors: {
        "&::placeholder": {
          color: theme.colors["fg.tertiary"],
        },
        "&[data-disabled]::placeholder": {
          color: theme.colors["fg.disabled"],
        },
        "&[data-readonly]": {
          cursor: "default",
        },
      },
    }),
    responsiveStyle({
      sm: {
        fontSize: "14px",
      },
    }),
  ],

  variants: {
    size: {
      md: {},
      lg: {},
      "2xl": [
        responsiveStyle({
          sm: {
            fontSize: "16px",
          },
        }),
      ],
    },
  },
});

export type ControlVariants = RecipeVariants<typeof control>;
