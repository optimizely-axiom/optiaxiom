import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: {
    border: "1",
  },

  defaultVariants: {
    size: "md",
    variant: "default",
  },

  variants: {
    size: {
      lg: { fontSize: "lg", h: "40", px: "8", w: "256" },
      md: { fontSize: "md", h: "32", px: "8", w: "256" },
      sm: { fontSize: "sm", h: "24", px: "8", w: "256" },
    },
    variant: {
      default: {
        ":data-disabled": {
          bg: "gray.100",
          pointerEvents: "none",
        },
        ":focus-visible": {
          borderColor: "slate.300",
          outline: "2",
          outlineColor: "blue.500",
          outlineOffset: "1",
        },
        ":hover": {
          borderColor: "brand.500",
        },
        bg: "white",
        color: "dark.600",
      },
    },
  },
});

export type Recipe = Parameters<typeof recipe>[0];
