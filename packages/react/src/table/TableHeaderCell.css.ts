import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const cell = recipe({
  base: style({
    textAlign: "start",
  }),

  variants: {
    /**
     * Whether to pin the header cell to left/right of table.
     */
    pinned: {
      false: style({
        position: "relative",
      }),
      true: style({
        position: "sticky",
        zIndex: "10",
      }),
    },
  },
});

export const content = recipe({
  base: [
    {
      alignItems: "center",
      bg: "bg.default",
      color: "fg.tertiary",
      display: "flex",
      fontSize: "sm",
      fontWeight: "400",
      size: "full",
    },
    style({
      boxShadow: `0 1px 0 ${theme.colors["border.tertiary"]}`,
    }),
  ],
});

export type CellVariants = RecipeVariants<typeof cell>;
