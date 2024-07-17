import { theme } from "../styles";
import { type RecipeVariants, style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const link = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "row",
      fontSize: "md",
      gap: "4",
    },
    style({
      textDecoration: "none",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.outline"]}`,
          outlineOffset: "2px",
        },
        "&:hover": {
          textDecoration: "underline",
        },
      },
    }),
  ],
  variants: {
    variant: {
      default: {},
      invert: {
        color: "white",
      },
      subtle: {
        color: "black",
      },
    },
  },
});

export type LinkVariants = RecipeVariants<typeof link>;
