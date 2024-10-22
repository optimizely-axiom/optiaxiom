import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const pill = recipe({
  base: [
    {
      bg: "bg.secondary",
      border: "0",
      fontSize: "sm",
      rounded: "md",
    },
    style({
      minWidth: "auto",
      position: "relative",
      userSelect: "none",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
      },
    }),
  ],
  variants: {
    size: {
      md: {
        h: "xs",
      },
      lg: {
        h: "sm",
      },
    },
  },
});

export type PillVariants = NonNullable<RecipeVariants<typeof pill>>;
