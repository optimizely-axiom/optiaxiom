import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

const marker = style({});

export const wrapper = recipe({
  base: [
    {
      border: "1",
      flexDirection: "row",
      gap: "0",
      rounded: "sm",
    },
    style({
      borderColor: theme.colors["border.default"],
      color: theme.colors["fg.default"],

      selectors: {
        [`&:has(${marker}:focus):is([data-invalid])`]: {
          outlineColor: theme.colors["red.200"],
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
        [`&:has(${marker}:focus):not([data-invalid]):not([data-readonly])`]: {
          borderColor: theme.colors["border.brand"],
        },
        [`&:has(${marker}:focus):not([data-invalid])`]: {
          outlineColor: theme.colors["brand.200"],
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },

        "&:hover": {
          borderColor: theme.colors["border.active"],
        },
        "&[data-invalid]": {
          borderColor: theme.colors["border.error"],
        },
        "&[data-readonly]": {
          borderColor: theme.colors["border.tertiary"],
        },

        "&[data-disabled]": {
          backgroundColor: theme.colors["bg.input.disabled"],
          borderColor: theme.colors["border.secondary"],
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],
});

export const input = recipe({
  base: [
    marker,
    {
      bg: "transparent",
      flex: "auto",
    },
    style({
      fontSize: "14px",
      lineHeight: "22px",
      minWidth: "0",
      outline: "2px solid transparent",

      selectors: {
        "&::placeholder": {
          color: theme.colors["fg.tertiary"],
        },
        "&[data-disabled]::placeholder": {
          color: theme.colors["fg.disabled"],
        },
        "&[data-readonly]": {
          cursor: "default",
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
