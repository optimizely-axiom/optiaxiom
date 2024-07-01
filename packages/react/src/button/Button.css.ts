import { theme } from "../styles";
import { createVar, style } from "../vanilla-extract";
import { type RecipeVariants, recipe } from "../vanilla-extract";

const accentColorVar = createVar();
const solidAccentColorVar = createVar();
const subtleAccentColorVar = createVar();
const internalSpaceVar = createVar();

export const button = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      flexDirection: "row",
      gap: "xs",
      justifyContent: "center",
      overflow: "hidden",
      transition: "colors",
    },
    style({
      borderRadius: theme.borderRadius.sm,
      cursor: "pointer",
      position: "relative",
      textDecoration: "none",

      selectors: {
        '&:active:not([data-disabled="true"])': {
          boxShadow: theme.boxShadow.inner,
        },
        "&:focus-visible": {
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "1px",
        },
        '&[data-disabled="true"]': {
          cursor: "not-allowed",
        },
      },
    }),
  ],
  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [accentColorVar]: theme.colors["bg.error.solid"],
          [solidAccentColorVar]: theme.colors["bg.error.solid.hover"],
          [subtleAccentColorVar]: theme.colors["bg.error.subtle"],
        },

        selectors: {
          "&:focus-visible": {
            outlineColor: "red.200",
          },
        },
      }),
      primary: style({
        vars: {
          [accentColorVar]: theme.colors["bg.brand.solid"],
          [solidAccentColorVar]: theme.colors["bg.brand.solid.hover"],
          [subtleAccentColorVar]: theme.colors["bg.brand.subtle"],
        },

        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["brand.300"],
          },
        },
      }),
      secondary: style({
        vars: {
          [accentColorVar]: theme.colors["fg.secondary"],
          [solidAccentColorVar]: theme.colors["fg.secondary.hover"],
          [subtleAccentColorVar]: theme.colors["bg.secondary.hover"],
        },

        selectors: {
          "&:focus-visible": {
            outlineColor: theme.colors["neutral.500"],
          },
        },
      }),
    },
    icon: {
      false: {},
      true: {},
    },
    size: {
      sm: {
        fontSize: "sm",
        h: "24",
        px: "10",
      },
      md: {
        fontSize: "md",
        h: "32",
        px: "12",
      },
      lg: {
        fontSize: "lg",
        h: "40",
        px: "16",
      },
    },
    variant: {
      ghost: style({
        backgroundColor: "transparent",
        color: accentColorVar,

        selectors: {
          '&:hover:not([data-disabled="true"])': {
            backgroundColor: subtleAccentColorVar,
          },
          '&[data-disabled="true"]': {
            backgroundColor: theme.colors["bg.disabled"],
            color: theme.colors["fg.disabled"],
          },
        },
      }),
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
    {
      style: style({ padding: "0", width: "24px" }),
      variants: {
        icon: true,
        size: "sm",
      },
    },
    {
      style: style({
        width: "32px",
      }),
      variants: {
        icon: true,
        size: "md",
      },
    },
    {
      style: style({
        width: "40px",
      }),
      variants: {
        icon: true,
        size: "lg",
      },
    },
  ],
});

export const icon = recipe({
  base: [
    {
      display: "block",
    },
    style({
      flexShrink: "0",
    }),
  ],
});
export const section = recipe({
  base: {
    alignItems: "center",
    display: "inline-flex",
    fontSize: "inherit",
    justifyContent: "center",
  },

  variants: {
    position: {
      end: style({
        paddingLeft: internalSpaceVar,
      }),
      start: style({
        paddingRight: internalSpaceVar,
      }),
    },
    size: {
      sm: style({
        vars: {
          [internalSpaceVar]: "0",
        },
      }),
      md: style({
        vars: {
          [internalSpaceVar]: theme.spacing[2],
        },
      }),
      lg: style({
        vars: {
          [internalSpaceVar]: theme.spacing[4],
        },
      }),
    },
  },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
