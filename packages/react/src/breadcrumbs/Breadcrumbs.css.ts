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

export const breadcrumbItem = recipe({
  base: style({
    alignItems: "center",
    display: "flex",
  }),
});

export const link = recipe({
  base: [
    style({
      selectors: {
        "&:focus-visible": {
          outline: `2px auto ${theme.colors["outline.brand"]}`,
          outlineOffset: "1px",
        },
        "&:hover": {
          textDecoration: "underline",
        },
      },
      textDecoration: "none",
    }),
  ],
});

export const separator = recipe({
  base: style({
    color: theme.colors["dark.500"],
    margin: "0 8px",
  }),
});

export const ellipsis = recipe({
  base: style({
    color: theme.colors["dark.500"],
    margin: "0 8px",
  }),
});

export type BreadcrumbsVariants = RecipeVariants<typeof breadcrumbs>;
