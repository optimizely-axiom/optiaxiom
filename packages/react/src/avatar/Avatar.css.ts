import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";

import { sprinkles } from "../sprinkles";
import { layers } from "../styles";
import { mapValues } from "../utils";

export const avatar = recipe({
  base: {
    "@layer": {
      [layers.axiom]: {
        alignItems: "center",
        borderRadius: "100%",
        display: "inline-flex",
        justifyContent: "center",
        overflow: "hidden",
        userSelect: "none",
      },
    },
  },

  defaultVariants: {
    color: "neutral",
    size: "md",
  },

  variants: {
    color: mapValues(
      {
        blue: "blue",
        brand: "brand",
        dark: "dark",
        gray: "gray",
        green: "green",
        magenta: "magenta",
        neutral: "neutral",
        orange: "orange",
        purple: "purple",
        red: "red",
        slate: "slate",
        yellow: "yellow",
      } as const,
      (color) =>
        sprinkles({
          bg: `${color}.50`,
          color: `${color}.500`,
        }),
    ),
    size: {
      xs: sprinkles({ fontSize: "xs", size: "xs" }),
      sm: sprinkles({ fontSize: "sm", size: "sm" }),
      md: sprinkles({ fontSize: "md", size: "md" }),
      lg: sprinkles({ fontSize: "lg", size: "lg" }),
      xl: sprinkles({ fontSize: "xl", size: "xl" }),
    },
  },
});

export type AvatarVariants = RecipeVariants<typeof avatar>;

export const fallback = recipe({
  base: sprinkles({
    alignItems: "center",
    display: "flex",
    fontFamily: "sans",
    justifyContent: "center",
    rounded: "inherit",
    size: "full",
    textTransform: "uppercase",
  }),

  variants: {
    size: {
      xs: sprinkles({ px: "4" }),
      sm: sprinkles({ px: "6" }),
      md: sprinkles({ px: "8" }),
      lg: sprinkles({ px: "10" }),
      xl: sprinkles({ px: "20" }),
    },
  },
});
