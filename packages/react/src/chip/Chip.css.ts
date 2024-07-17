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
      rounded: "md",
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
      neutral: style({
        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["gray.300"],
          },
        },
        vars: {
          [accentColorVar]: theme.colors["gray.300"],
          [solidAccentColorVar]: theme.colors["gray.600"],
          [subtleAccentColorVar]: theme.colors["gray.50"],
        },
      }),
    },
    size: {
      sm: {
        fontSize: "sm",
        px: "sm",
        py: "2",
      },
      md: {
        fontSize: "md",
        px: "sm",
        py: "4",
      },
      lg: {
        fontSize: "lg",
        px: "md",
        py: "6",
      },
    },
    variant: {
      solid: style({
        backgroundColor: accentColorVar,
        color: theme.colors["fg.default"],
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

export const toggleRoot = recipe({
  base: [
    {
      gap: "xs",
    },
  ],
});

export type ChipVariants = NonNullable<RecipeVariants<typeof chip>>;
