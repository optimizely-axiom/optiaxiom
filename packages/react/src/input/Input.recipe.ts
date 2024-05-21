import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: {
    border: "0",
  },

  defaultVariants: {
    size: "md",
    variant: "text",
  },

  variants: {
    size: {
      lg: { fontSize: "lg", h: "40" },
      md: { fontSize: "md", h: "32" },
      sm: { fontSize: "sm", h: "24" },
    },
    variant: {
      number: {
        ":data-disabled": {
          bg: "gray.100",
          pointerEvents: "none",
        },
        ":focus-visible": {
          borderColor: "brand.500",
        },
        ":hover": {
          borderColor: "brand.500",
        },
        bg: "white",
        color: "dark.600",
      },
      text: {
        ":data-disabled": {
          bg: "gray.100",
          pointerEvents: "none",
        },
        ":focus-visible": {
          borderColor: "brand.500",
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
