import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const progress = recipe({
  base: [
    {
      bg: "bg.pill.default",
      overflow: "hidden",
      rounded: "full",
    },
    style({
      height: "8px",
    }),
  ],
});

export const indicator = recipe({
  base: [
    {
      h: "full",
      rounded: "full",
      transition: "all",
    },
  ],
  variants: {
    /**
     * Control the appearance by selecting between the different progress types.
     */
    intent: {
      danger: style({
        backgroundColor: theme.colors["bg.error"],
      }),
      opal: {},
      primary: {},
      success: {},
    },
  },

  variantsCompounded: [
    {
      style: style({
        backgroundColor: theme.colors["fg.tertiary"],
      }),
      variants: {
        intent: ["opal", "primary", "success"],
      },
    },
  ],
});

export type ProgressVariants = RecipeVariants<typeof indicator>;
