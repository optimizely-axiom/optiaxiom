import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: {
    border: "1",
    rounded: "sm",
  },

  defaultVariants: {
    size: "md",
    variant: "default",
  },

  variants: {
    size: {
      lg: { fontSize: "lg", h: "40", px: "8", py: "8", w: "256" },
      md: { fontSize: "md", h: "32", px: "8", py: "8", w: "256" },
      sm: { fontSize: "sm", h: "24", px: "8", py: "8", w: "256" },
    },
    variant: {
      default: {
        ":aria-error": {
          borderColor: "red.500",
        },
        ":data-disabled": {
          backgroundColor: "neutral.50",
          borderColor: "neutral.150",
          color: "neutral.500",
          pointerEvents: "none",
        },
        ":focus-visible": {
          outline: "2",
          outlineColor: "brand.200",
          outlineOffset: "1",
        },
        ":hover": {
          borderColor: "brand.500",
        },
        bg: "white",
        color: "dark.600",
      },
      number: {
        ":aria-error": {
          borderColor: "red.500",
        },
        ":data-disabled": {
          backgroundColor: "neutral.50",
          borderColor: "neutral.150",
          color: "neutral.500",
          pointerEvents: "none",
        },
        ":focus-visible": {
          outline: "2",
          outlineColor: "brand.200",
          outlineOffset: "1",
        },
        ":hover": {
          borderColor: "brand.500",
        },
        bg: "white",
        color: "dark.600",
        textAlign: "end",
      },
    },
  },
});

export type Recipe = Parameters<typeof recipe>[0];
