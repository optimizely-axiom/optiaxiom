import { theme } from "../styles";
import { createVar, fallbackVar, style } from "../vanilla-extract";
import { type RecipeVariants, recipe } from "../vanilla-extract";

const accentColorVar = createVar();
const solidAccentColorVar = createVar();
const subtleAccentColorVar = createVar();

const borderColorVar = createVar();
const boxShadowBorder = `inset 0 0 0 1px ${fallbackVar(borderColorVar, "transparent")}`;
const boxShadowVar = createVar();

export const button = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      flexDirection: "row",
      gap: "4",
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
          vars: {
            [boxShadowVar]: theme.boxShadow.inner,
          },

          boxShadow: `${boxShadowBorder}, ${boxShadowVar}`,
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
    iconOnly: {
      false: {},
      true: {},
    },
    size: {
      sm: {
        fontSize: "sm",
        h: "sm",
      },
      md: {
        fontSize: "md",
        h: "md",
      },
      lg: {
        fontSize: "lg",
        h: "lg",
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
        vars: {
          [borderColorVar]: accentColorVar,
        },

        backgroundColor: "transparent",
        boxShadow: boxShadowBorder,
        color: accentColorVar,

        selectors: {
          '&:hover:not([data-disabled="true"])': {
            backgroundColor: subtleAccentColorVar,
          },
          '&[data-disabled="true"]': {
            vars: {
              [borderColorVar]: theme.colors["border.disabled"],
            },

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
            vars: {
              [borderColorVar]: theme.colors["border.disabled"],
            },

            backgroundColor: theme.colors["bg.disabled"],
            boxShadow: boxShadowBorder,
            color: theme.colors["fg.disabled"],
          },
        },
      }),
    },
  },
  variantsCompounded: [
    {
      style: style({
        vars: {
          [borderColorVar]: theme.colors["border.default"],
        },
      }),
      variants: {
        colorScheme: "secondary",
        variant: "outline",
      },
    },
    {
      style: {
        px: "2",
      },
      variants: {
        iconOnly: true,
        size: "sm",
      },
    },
    {
      style: {
        px: "4",
      },
      variants: {
        iconOnly: false,
        size: "sm",
      },
    },
    {
      style: {
        px: "6",
      },
      variants: {
        iconOnly: true,
        size: "md",
      },
    },
    {
      style: {
        px: "8",
      },
      variants: {
        iconOnly: false,
        size: "md",
      },
    },
    {
      style: {
        px: "10",
      },
      variants: {
        iconOnly: true,
        size: "lg",
      },
    },
    {
      style: {
        px: "12",
      },
      variants: {
        iconOnly: false,
        size: "lg",
      },
    },
  ],
});

export const section = recipe({
  variants: {
    position: {
      end: {},
      start: {},
    },
    size: {
      sm: {
        w: "20",
      },
      md: {
        w: "20",
      },
      lg: {
        w: "20",
      },
    },
  },

  variantsCompounded: [
    {
      style: {
        ml: "2",
      },
      variants: {
        position: "end",
        size: "md",
      },
    },
    {
      style: {
        mr: "2",
      },
      variants: {
        position: "start",
        size: "md",
      },
    },
    {
      style: {
        ml: "4",
      },
      variants: {
        position: "end",
        size: "lg",
      },
    },
    {
      style: {
        mr: "4",
      },
      variants: {
        position: "start",
        size: "lg",
      },
    },
  ],
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
