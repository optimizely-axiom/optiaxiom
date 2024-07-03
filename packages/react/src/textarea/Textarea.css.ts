import { theme } from "../styles";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const textarea = recipe({
  base: [
    style({
      flexGrow: "1",
      selectors: {
        "&:focus-visible": {
          outline: "0",
        },
      },
    }),
  ],
});

export const wrapper = recipe({
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
          outlineColor: theme.colors["brand.200"],
          outlineOffset: "1",
        },
        "&:hover": {
          borderColor: "border.brand",
        },
      },
    }),
  ],
});

// export type WrapperVariants = RecipeVariants<typeof wrapper>;
// export type TextareaVariants = RecipeVariants<typeof textarea>;
