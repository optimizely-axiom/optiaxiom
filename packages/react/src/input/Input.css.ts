import { theme } from "../styles";
import { type RecipeVariants, recipe } from "../vanilla-extract";

export const wrapper = recipe({
  base: {
    alignItems: "center",
    border: "1px",
    borderColor: theme.colors["border.default"],
    borderRadius: theme.borderRadius.sm,
    borderStyle: "solid",
    color: theme.colors["fg.default"],
    display: "flex",
    flexDirection: "row",
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
  },

  variants: {
    size: {
      sm: {
        fontSize: theme.fontSize["sm"].fontSize,
        height: "24px",
        lineHeight: theme.fontSize["sm"].lineHeight,
        padding: "8px 8px",
      },
      md: {
        fontSize: theme.fontSize["md"].fontSize,
        height: "32px",
        lineHeight: theme.fontSize["md"].lineHeight,
        padding: "8px 8px",
      },

      lg: {
        fontSize: theme.fontSize["lg"].fontSize,
        height: "40px",
        lineHeight: theme.fontSize["lg"].lineHeight,
        padding: "4px 8px",
      },
    },
    variant: {
      default: {},
      number: {},
    },
  },
});

export const input = recipe({
  base: {
    background: theme.colors["transparent"],
    width: "100%",

    selectors: {
      "&:focus-visible": {
        outlineWidth: "0px",
      },
    },
  },
  variants: {
    variant: {
      default: {
        textAlign: "start",
      },
      number: {
        textAlign: "end",
      },
    },
  },
});

export type WrapperVariants = RecipeVariants<typeof wrapper>;
export type InputVariants = RecipeVariants<typeof input>;
