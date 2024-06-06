import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";

import { layers, theme } from "../styles";

export const input = recipe({
  base: {
    "@layer": {
      [layers.axiom]: {
        border: "1px",
        borderColor: theme.colors["border.default"],
        borderRadius: theme.borderRadius.sm,
        borderStyle: "solid",
        color: theme.colors["fg.default"],
        display: "flex",
        flexDirection: "column",
        fontFamily: theme.fontFamily["sans"],
        selectors: {
          '&:focus-visible:is([data-invalid="true"])': {
            outlineColor: theme.colors["red.200"],
            outlineOffset: "1px",
            outlineStyle: "solid",
            outlineWidth: "2px",
          },
          '&:focus-visible:not([data-invalid="true"])': {
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
      },
    },
  },

  variants: {
    size: {
      sm: {
        "@layer": {
          [layers.axiom]: {
            fontSize: theme.fontSize["sm"].fontSize,
            height: "24px",
            lineHeight: theme.fontSize["sm"].lineHeight,
            padding: "8px 8px",
          },
        },
      },
      md: {
        "@layer": {
          [layers.axiom]: {
            fontSize: theme.fontSize["md"].fontSize,
            height: "32px",
            lineHeight: theme.fontSize["md"].lineHeight,
            padding: "8px 8px",
          },
        },
      },
      lg: {
        "@layer": {
          [layers.axiom]: {
            fontSize: theme.fontSize["lg"].fontSize,
            height: "40px",
            lineHeight: theme.fontSize["lg"].lineHeight,
            padding: "4px 8px",
          },
        },
      },
    },
    variant: {
      default: {
        "@layer": {
          [layers.axiom]: {
            textAlign: "start",
          },
        },
      },
      number: {
        "@layer": {
          [layers.axiom]: {
            textAlign: "end",
          },
        },
      },
    },
  },
});

export type InputVariants = RecipeVariants<typeof input>;
