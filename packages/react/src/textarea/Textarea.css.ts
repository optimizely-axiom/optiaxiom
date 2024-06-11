import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const textAreaBoxRecipe = recipe({
  base: [
    style({
      background: "transparent",
      flexGrow: "1",
      padding: "8px",

      selectors: {
        "&:focus-visible": {
          outline: "0",
        },
      },
    }),
  ],
  variants: {},
});

export const parentBoxRecipe = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      fontSize: "md",
      overflow: "auto",
    },
    style({
      background: "white",
      border: "1",
      borderColor: "border.default",
      color: "fg.default",
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
    }),
  ],
  variants: {},
});

export type ParentRecipeVariants = Parameters<typeof parentBoxRecipe>;
export type TextAreaRecipeVariants = Parameters<typeof textAreaBoxRecipe>;
