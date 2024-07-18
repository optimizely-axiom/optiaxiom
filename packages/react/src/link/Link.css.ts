import { theme } from "../styles";
import { type RecipeVariants, style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const link = recipe({
  base: [
    {
      fontSize: "md",
    },
    style({
      textDecoration: "none",

      selectors: {
        "&:focus-visible": {
          outline: `2px auto ${theme.colors["outline.brand"]}`,
          outlineOffset: "1px",
        },
        "&:hover:not([data-disabled])": {
          textDecoration: "underline",
        },
        "&:visited": {
          color: theme.colors["fg.link.visited"],
        },
        "&[data-disabled]": {
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],
  variants: {
    variant: {
      default: style({
        color: theme.colors["fg.link"],

        selectors: {
          "&:hover:not([data-disabled])": {
            color: theme.colors["fg.link.hover"],
          },
        },
      }),
      muted: style({
        color: theme.colors["fg.tertiary"],
      }),
      subtle: style({
        color: theme.colors["fg.default"],
      }),
    },
  },
});

export type LinkVariants = RecipeVariants<typeof link>;
