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
      secondary: style({
        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["neutral.500"],
          },
        },
        vars: {
          [accentColorVar]: theme.colors["fg.secondary"],
          [solidAccentColorVar]: theme.colors["fg.secondary.hover"],
          [subtleAccentColorVar]: theme.colors["bg.secondary.hover"],
        },
      }),
      success: style({
        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["green.300"],
          },
        },
        vars: {
          [accentColorVar]: theme.colors["bg.success.solid"],
          [solidAccentColorVar]: theme.colors["bg.success.solid.hover"],
          [subtleAccentColorVar]: theme.colors["bg.success.subtle"],
        },
      }),
      warning: style({
        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["yellow.300"],
          },
        },
        vars: {
          [accentColorVar]: theme.colors["bg.warning.solid"],
          [solidAccentColorVar]: theme.colors["bg.warning.solid.hover"],
          [subtleAccentColorVar]: theme.colors["bg.warning.subtle"],
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
      }),
      solid: style({
        backgroundColor: accentColorVar,
        color: theme.colors["fg.default.inverse"],
      }),
    },
  },
  variantsCompounded: [
    {
      style: style({
        borderColor: theme.colors["border.default"],
      }),
      variants: {
        colorScheme: "secondary",
        variant: "outline",
      },
    },
  ],
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
