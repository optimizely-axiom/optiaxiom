import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const wrapper = recipe({
  base: [
    {
      alignItems: "center",
      border: "1",
      color: "fg.default",
      display: "flex",
      flexDirection: "row",
      rounded: "sm",
    },
    style({
      borderColor: theme.colors["border.default"],

      selectors: {
        '&:focus-within:is([data-invalid="true"])': {
          outlineColor: theme.colors["red.200"],
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
        '&:focus-within:not([data-invalid="true"])': {
          outlineColor: theme.colors["brand.200"],
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
        "&:hover": {
          borderColor: theme.colors["border.brand"],
        },
        '&[data-disabled="true"]': {
          backgroundColor: theme.colors["bg.disabled"],
          borderColor: theme.colors["border.secondary"],
          pointerEvents: "none",
        },
        '&[data-invalid="true"]': {
          borderColor: theme.colors["border.error"],
        },
      },
    }),
  ],
});

export const input = recipe({
  base: [
    {
      bg: "transparent",
      flex: "auto",
    },
    style({
      fontSize: "14px",
      lineHeight: "22px",

      selectors: {
        "&:focus-visible": {
          outlineWidth: "0px",
        },
      },
    }),
  ],

  variants: {
    size: {
      sm: {
        px: "4",
        py: "0",
      },
      md: {
        px: "8",
        py: "4",
      },
      lg: {
        px: "8",
        py: "8",
      },
    },
  },
});

export const decorator = recipe({
  variants: {
    position: {
      end: {
        mr: "8",
      },
      start: {
        ml: "8",
      },
    },
  },
});

export type InputVariants = RecipeVariants<typeof input>;
