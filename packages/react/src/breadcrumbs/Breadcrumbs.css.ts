import { theme } from "../styles";
import { type RecipeVariants, style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const breadcrumbs = recipe({
  base: [
    style({
      alignItems: "center",
      display: "flex",
      padding: "8px 0",
    }),
  ],
  variants: {
    colorScheme: {
      neutral: style({
        color: theme.colors["fg.default"],
      }),
      primary: style({
        color: theme.colors["fg.link"],
      }),
      secondary: style({
        color: theme.colors["fg.tertiary"],
      }),
    },
    size: {
      medium: {
        fontSize: "md",
      },
      small: {
        fontSize: "sm",
      },
    },
  },
});

export const breadcrumbsList = recipe({
  base: style({
    alignItems: "center",
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  }),
});

export type BreadcrumbsVariants = RecipeVariants<typeof breadcrumbs>;
