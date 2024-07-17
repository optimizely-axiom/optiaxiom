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
          outline: `2px solid ${theme.colors["outline.brand"]}`,
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
      default: style({
        color: theme.colors["fg.brand"],
        selectors: {
          "&:hover": {
            color: theme.colors["fg.brand.hover"],
          },
          "&:visited": {
            // TODO: Add a token for visited
            color: theme.colors["purple.500"],
          },
        },
      }),

      subtle: style({
        color: "black",
        selectors: {
          "&:visited": {
            color: theme.colors["purple.500"],
          },
        },
      }),
    },
  },
});

export type LinkVariants = RecipeVariants<typeof link>;
