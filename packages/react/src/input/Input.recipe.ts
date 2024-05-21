import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: {
    border: "1",
  },

  defaultVariants: {
    size: "md",
    variant: "text",
  },

  variants: {
    size: {
      lg: { fontSize: "lg", h: "40", px: "16", py: "12" },
      md: { fontSize: "md", h: "32", px: "12", py: "10" },
      sm: { fontSize: "sm", h: "24", px: "10", py: "6" },
    },
    variant: {
      text: {
        ":hover": {
          borderColor: "brand.500",
        },
        ":focus-visible":{
          borderColor: "brand.500",
        },
        ":data-disabled":{
          bg: "gray.100",
          pointerEvents: 'none'
        },
        bg: "white",
        color: "dark.600",
      },
      number: {
        ":hover": {
          borderColor: "brand.500",
        },
        ":focus-visible":{
          borderColor: "brand.500",
        },
        ":data-disabled":{
          bg: "gray.100",
          pointerEvents: 'none'
        },
        bg: "white",
        color: "dark.600",
        
      },
    },
  },
});

export type Recipe = Parameters<typeof recipe>[0];
