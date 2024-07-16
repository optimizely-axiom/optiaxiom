import { theme } from "../styles";
import { createVar, style } from "../vanilla-extract";
import { type RecipeVariants, recipe } from "../vanilla-extract";

const accentColorVar = createVar();
const solidAccentColorVar = createVar();
const subtleAccentColorVar = createVar();

export const chip = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      flexDirection: "row",
      gap: "4",
      justifyContent: "center",
      overflow: "hidden",
      rounded: "full",
      transition: "colors",
    },
    style({
      position: "relative",
      userSelect: "none",

      selectors: {
        "&:focus-visible": {
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
        '&[data-state="on"]': {
          backgroundColor: solidAccentColorVar,
        },
      },
    }),
  ],
  variants: {
    colorScheme: {
      danger: style({
        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["red.200"],
          },
        },
        vars: {
          [accentColorVar]: theme.colors["bg.error.solid"],
          [solidAccentColorVar]: theme.colors["bg.error.solid.hover"],
          [subtleAccentColorVar]: theme.colors["bg.error.subtle"],
        },
      }),
      neutral: style({
        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["gray.300"],
          },
        },
        vars: {
          [accentColorVar]: theme.colors["gray.500"],
          [solidAccentColorVar]: theme.colors["gray.600"],
          [subtleAccentColorVar]: theme.colors["gray.50"],
        },
      }),
      primary: style({
        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["brand.300"],
          },
        },
        vars: {
          [accentColorVar]: theme.colors["bg.brand.solid"],
          [solidAccentColorVar]: theme.colors["bg.brand.solid.hover"],
          [subtleAccentColorVar]: theme.colors["bg.brand.subtle"],
        },
      }),
    },
    size: {
      sm: {
        fontSize: "sm",
        px: "sm",
        py: "1",
      },
      md: {
        fontSize: "md",
        px: "sm",
        py: "2",
      },
      lg: {
        fontSize: "lg",
        px: "sm",
        py: "3",
      },
    },
    variant: {
      outline: style({
        backgroundColor: "transparent",
        border: `1px solid ${accentColorVar}`,
        color: accentColorVar,
        selectors: {
          '&:hover:not([data-disabled="true"])': {
            backgroundColor: subtleAccentColorVar,
          },
          '&[data-disabled="true"]': {
            borderColor: theme.colors["border.disabled"],
            color: theme.colors["fg.disabled"],
          },
        },
      }),
      solid: style({
        backgroundColor: accentColorVar,
        color: theme.colors["fg.default.inverse"],
        selectors: {
          '&:hover:not([data-disabled="true"])': {
            backgroundColor: solidAccentColorVar,
          },
          '&[data-disabled="true"]': {
            backgroundColor: theme.colors["bg.disabled"],
            border: `1px solid ${theme.colors["border.disabled"]}`,
            color: theme.colors["fg.disabled"],
          },
        },
      }),
    },
  },
});

export const icon = recipe({
  base: [
    {
      ml: "4",
    },
  ],
  variants: {
    size: {
      sm: {
        w: "16",
      },
      md: {
        w: "20",
      },
      lg: {
        w: "24",
      },
    },
  },
});

export type ChipVariants = NonNullable<RecipeVariants<typeof chip>>;
