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
      lg: { fontSize: "lg", h: "40", px: "16", py: "12" },
      md: { fontSize: "md", h: "32", px: "12", py: "10" },
      sm: { fontSize: "sm", h: "24", px: "10", py: "6" },
    },
    variant: {
      default: {
        ":hover": {
          bg: "blue.50",
        },
        bg: "white",
        color: "blue.500",
      },
      primary: {
        ":hover": {
          bg: "brand.600",
        },
        bg: "brand.500",
        color: "white",
      },
    },
  },
});

export type Recipe = Parameters<typeof recipe>[0];
