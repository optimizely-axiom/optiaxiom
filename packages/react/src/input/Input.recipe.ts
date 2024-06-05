import { createRecipe } from "../recipes";

export const recipe = createRecipe({
  base: {
    border: "1",
    rounded: "sm",
  },
  variants: {
    size: {
      lg: { fontSize: "lg", h: "40", px: "8", py: "8" },
      md: { fontSize: "md", h: "32", px: "8", py: "8" },
      sm: { fontSize: "sm", h: "24", px: "8", py: "8" },
    },
    variant: {
      default: {
        ":aria-invalid": {
          borderColor: "border.error",
        },
        ":data-disabled": {
          backgroundColor: "bg.disabled",
          borderColor: "border.secondary",
          color: "fg.quaternary",
          pointerEvents: "none",
        },
        ":focus-visible": {
          outline: "2",
          outlineColor: "brand.200",
          outlineOffset: "1",
        },
        ":hover": {
          borderColor: "border.brand",
        },
        bg: "white",
        color: "fg.default",
      },
      number: {
        ":aria-invalid": {
          borderColor: "border.error",
        },
        ":data-disabled": {
          backgroundColor: "bg.disabled",
          borderColor: "border.secondary",
          color: "fg.quaternary",
          pointerEvents: "none",
        },
        ":focus-visible": {
          outline: "2",
          outlineColor: "brand.200",
          outlineOffset: "1",
        },
        ":hover": {
          borderColor: "border.brand",
        },
        bg: "white",
        color: "fg.default",
        textAlign: "end",
      },
    },
  },
});

export type Recipe = Parameters<typeof recipe>[0];
