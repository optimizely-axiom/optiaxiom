import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const wrapper = recipe({
  base: style({
    position: "relative",
  }),
});

export const root = recipe({
  base: [
    {
      border: "1",
      rounded: "md",
      transition: "colors",
    },
    style({
      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:not([data-readonly]):is(:hover, :has(:focus-visible))": {
              borderColor: theme.colors["border.control"],
            },
          },
        },
      },
    }),
  ],
  variants: {
    /**
     * Control the size of the button.
     */
    size: {
      md: style({
        padding: "5px",
      }),
      lg: style({
        padding: "7px",
      }),
    },
  },
});

export const trigger = recipe({
  base: [
    {
      display: "grid",
      placeItems: "center",
      rounded: "md",
    },
    style({
      outline: "none",
    }),
  ],
});

export type RootVariants = RecipeVariants<typeof root>;
