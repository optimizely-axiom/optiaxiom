import { mapValues } from "../utils";
import { style } from "../vanilla-extract";
import { type RecipeVariants, recipe } from "../vanilla-extract";

export const avatar = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      justifyContent: "center",
      overflow: "hidden",
      rounded: "full",
    },
    style({
      userSelect: "none",
    }),
  ],

  variants: {
    colorScheme: mapValues(
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
      (color) => ({
        bg: `${color}.50`,
        color: `${color}.500`,
      }),
    ),
    size: {
      xs: { fontSize: "xs", size: "xs" },
      sm: { fontSize: "sm", size: "sm" },
      md: { fontSize: "md", size: "md" },
      lg: { fontSize: "lg", size: "lg" },
      xl: { fontSize: "xl", size: "xl" },
    },
  },
});

export type AvatarVariants = RecipeVariants<typeof avatar>;

export const fallback = recipe({
  base: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    rounded: "inherit",
    size: "full",
    textTransform: "uppercase",
  },

  variants: {
    size: {
      xs: { px: "4" },
      sm: { px: "6" },
      md: { px: "8" },
      lg: { px: "10" },
      xl: { px: "20" },
    },
  },
});
