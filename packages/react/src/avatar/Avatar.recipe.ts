import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: {
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    overflow: "hidden",
  },

  defaultVariants: {
    color: "neutral",
    size: "md",
  },

  variants: {
    color: {
      blue: { bg: "blue.50", color: "blue.500" },
      brand: { bg: "brand.50", color: "brand.500" },
      dark: { bg: "dark.50", color: "dark.500" },
      gray: { bg: "green.50", color: "gray.500" },
      green: { bg: "green.50", color: "green.500" },
      magenta: { bg: "magenta.50", color: "magenta.500" },
      neutral: { bg: "neutral.50", color: "neutral.500" },
      orange: { bg: "orange.50", color: "orange.500" },
      purple: { bg: "purple.50", color: "purple.500" },
      red: { bg: "red.50", color: "red.500" },
      slate: { bg: "slate.50", color: "slate.500" },
      yellow: { bg: "yellow.50", color: "yellow.500" },
    },
    size: {
      lg: { fontSize: "lg", h: "40", w: "40" },
      md: { fontSize: "md", h: "32", w: "32" },
      sm: { fontSize: "sm", h: "24", w: "24" },
      xl: { fontSize: "xl", h: "64", w: "64" },
      xs: { fontSize: "xs", h: "20", w: "20" },
    },
  },
});

export type Recipe = Parameters<typeof recipe>[0];
