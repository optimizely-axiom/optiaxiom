import { theme } from "@optiaxiom/globals";

import { rem } from "../utils";
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
       * Never compute below 16px on mobile because otherwise iOS will zoom in
       * on the page anytime the input is focused
       */
      fontSize: `max(16px, ${rem("16px")})`,
      /**
       * Line-height was set to 22px to adjust for the 1px border on top and bottom
       */
      lineHeight: rem("22px"),
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
        fontSize: rem("14px"),
      },
    }),
  ],

  variants: {
    /**
     * Control the size of the input.
     */
    size: {
      md: {},
      lg: {},
      xl: [
        responsiveStyle({
          sm: {
            fontSize: rem("16px"),
          },
        }),
      ],
    },
  },
});

export type ControlVariants = RecipeVariants<typeof control>;
