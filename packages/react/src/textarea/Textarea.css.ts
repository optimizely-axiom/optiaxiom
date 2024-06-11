import { recipe } from "../vanilla-extract";

export const textAreaBoxRecipe = recipe({
  base: {
    background: "transparent",
    flexGrow: "1",
    fontFamily: "sans",
    padding: "8px",
    selectors: {
      "&:focus-visible": {
        outline: "0",
      },
    },
  },
  variants: {},
});

export const parentBoxRecipe = recipe({
  base: {
    background: "white",
    border: "1",
    borderColor: "border.default",
    color: "fg.default",
    display: "flex",
    flexDirection: "column",
    fontSize: "md",
    overflow: "auto",
    selectors: {
      "&:aria-invalid": {
        borderColor: "border.error",
      },
      "&:data-disabled": {
        backgroundColor: "bg.disabled",
        borderColor: "border.secondary",
        color: "fg.quaternary",
        pointerEvents: "none",
      },
      "&:focus-within": {
        outline: "2",
        outlineColor: "brand.200",
        outlineOffset: "1",
      },
      "&:hover": {
        borderColor: "border.brand",
      },
    },
    // rounded: "sm",
  },
  variants: {},
});

export type ParentRecipeVariants = Parameters<typeof parentBoxRecipe>;
export type TextAreaRecipeVariants = Parameters<typeof textAreaBoxRecipe>;
