import { theme } from "../styles";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

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
  variants: {
    isEllipsis: {
      false: {},
      true: style({
        color: theme.colors["dark.500"],
      }),
    },
  },
});

export const separator = recipe({
  base: style({
    color: theme.colors["dark.500"],
    margin: "0 8px",
  }),
});
