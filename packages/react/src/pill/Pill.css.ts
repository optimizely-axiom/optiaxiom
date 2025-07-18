import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const pill = recipe({
  base: [
    {
      alignItems: "center",
      color: "fg.default",
      display: "flex",
      fontSize: "sm",
      gap: "4",
      px: "6",
      rounded: "md",
      transition: "colors",
      whiteSpace: "nowrap",
    },
    style({
      backgroundColor: theme.colors["bg.tertiary"],
      position: "relative",
      userSelect: "none",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:not([data-disabled]):hover": {
              backgroundColor: theme.colors["bg.tertiary.hovered"],
            },
          },
        },
      },

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },

        "&[data-disabled]": {
          opacity: 0.6,
        },
      },
    }),
  ],
  variants: {
    /**
     * Control the size of the pill.
     */
    size: {
      xs: {
        h: "xs",
      },
      sm: {
        h: "sm",
      },
    },
  },
});

export type PillVariants = RecipeVariants<typeof pill>;
