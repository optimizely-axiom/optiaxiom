import { createVar } from "@vanilla-extract/css";
import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";

import { layers, theme } from "../styles";

const accentColorVar = createVar();
const solidAccentColorVar = createVar();
const subtleAccentColorVar = createVar();

export const button = recipe({
  base: {
    "@layer": {
      [layers.axiom]: {
        alignItems: "center",
        border: "0",
        borderRadius: theme.borderRadius.sm,
        cursor: "pointer",
        display: "inline-flex",
        flexDirection: "row",
        gap: theme.spacing.xs,
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        transitionDuration: "150ms",
        transitionProperty: "background-color, border-color, color",
        transitionTimingFunction: "ease",

        selectors: {
          '&:active:not([aria-disabled="true"])': {
            boxShadow: theme.boxShadow.inner,
          },
          "&:focus-visible": {
            outlineOffset: "1px",
            outlineStyle: "solid",
            outlineWidth: "1px",
          },
          '&[aria-disabled="true"]': {
            cursor: "not-allowed",
          },
        },
      },
    },
  },

  compoundVariants: [
    {
      style: {
        "@layer": {
          [layers.axiom]: {
            borderColor: theme.colors["border.default"],
          },
        },
      },
      variants: {
        colorScheme: "secondary",
        variant: "outline",
      },
    },
  ],

  defaultVariants: {
    colorScheme: "secondary",
    size: "md",
    variant: "solid",
  },

  variants: {
    colorScheme: {
      danger: {
        "@layer": {
          [layers.axiom]: {
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
          },
        },
      },
      primary: {
        "@layer": {
          [layers.axiom]: {
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
          },
        },
      },
      secondary: {
        "@layer": {
          [layers.axiom]: {
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
          },
        },
      },
    },
    size: {
      sm: {
        "@layer": {
          [layers.axiom]: {
            fontSize: theme.fontSize["sm"].fontSize,
            height: "24px",
            lineHeight: theme.fontSize["sm"].lineHeight,
            paddingInline: "10px",
          },
        },
      },
      md: {
        "@layer": {
          [layers.axiom]: {
            fontSize: theme.fontSize["md"].fontSize,
            height: "32px",
            lineHeight: theme.fontSize["md"].lineHeight,
            paddingInline: "12px",
          },
        },
      },
      lg: {
        "@layer": {
          [layers.axiom]: {
            fontSize: theme.fontSize["lg"].fontSize,
            height: "40px",
            lineHeight: theme.fontSize["lg"].lineHeight,
            paddingInline: "16px",
          },
        },
      },
    },
    variant: {
      ghost: {
        "@layer": {
          [layers.axiom]: {
            backgroundColor: "transparent",
            color: accentColorVar,

            selectors: {
              '&:hover:not([aria-disabled="true"])': {
                backgroundColor: subtleAccentColorVar,
              },
              '&[aria-disabled="true"]': {
                backgroundColor: theme.colors["bg.disabled"],
                color: theme.colors["fg.disabled"],
              },
            },
          },
        },
      },
      outline: {
        "@layer": {
          [layers.axiom]: {
            backgroundColor: "transparent",
            border: `1px solid ${accentColorVar}`,
            color: accentColorVar,

            selectors: {
              '&:hover:not([aria-disabled="true"])': {
                backgroundColor: subtleAccentColorVar,
              },
              '&[aria-disabled="true"]': {
                borderColor: theme.colors["border.disabled"],
                color: theme.colors["fg.disabled"],
              },
            },
          },
        },
      },
      solid: {
        "@layer": {
          [layers.axiom]: {
            backgroundColor: accentColorVar,
            color: theme.colors["fg.default.inverse"],

            selectors: {
              '&:hover:not([aria-disabled="true"])': {
                backgroundColor: solidAccentColorVar,
              },
              '&[aria-disabled="true"]': {
                backgroundColor: theme.colors["bg.disabled"],
                border: `1px solid ${theme.colors["border.disabled"]}`,
                color: theme.colors["fg.disabled"],
              },
            },
          },
        },
      },
    },
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
