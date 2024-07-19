import * as styles from "../button-group/ButtonGroup.css";
import { theme } from "../styles";
import { createVar, fallbackVar, style } from "../vanilla-extract";
import { type RecipeVariants, recipe } from "../vanilla-extract";

const group = styles.buttonGroup().className;

const accentColorVar = createVar();
const solidAccentColorVar = createVar();
const solidTextColorVar = createVar();
const subtleAccentColorVar = createVar();
const subtleTextColorVar = createVar();

const paddingInlineVar = createVar();

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
      paddingInline: paddingInlineVar,
      position: "relative",
      textDecoration: "none",
      userSelect: "none",

      selectors: {
        "&:active:not([data-disabled])": {
          boxShadow: theme.boxShadow.inner,
        },
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["outline.brand"]}`,
          outlineOffset: "1px",
        },
        "&[data-disabled]": {
          cursor: "not-allowed",
        },
        [`${group}[data-orientation="horizontal"] &:not(:first-child):not(:last-child)`]:
          {
            borderInlineWidth: "0.5px",
          },
        [`${group}[data-orientation="horizontal"] &:not(:only-child):first-child`]:
          {
            borderBottomRightRadius: 0,
            borderRightWidth: "0.5px",
            borderTopRightRadius: 0,
          },
        [`${group}[data-orientation="horizontal"] &:not(:only-child):last-child`]:
          {
            borderBottomLeftRadius: 0,
            borderLeftWidth: "0.5px",
            borderTopLeftRadius: 0,
          },
        [`${group}[data-orientation="vertical"] &:not(:first-child):not(:last-child)`]:
          {
            borderBlockWidth: "0.5px",
          },
        [`${group}[data-orientation="vertical"] &:not(:only-child):first-child`]:
          {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomWidth: "0.5px",
          },
        [`${group}[data-orientation="vertical"] &:not(:only-child):last-child`]:
          {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTopWidth: "0.5px",
          },
        [`${group}[data-orientation] &:not(:first-child):not(:last-child)`]: {
          borderRadius: 0,
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
          [subtleAccentColorVar]: theme.colors["bg.error"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["bg.neutral.solid"],
          [solidAccentColorVar]: theme.colors["bg.neutral.solid.hover"],
          [solidTextColorVar]: theme.colors["fg.default"],
          [subtleAccentColorVar]: theme.colors["bg.neutral"],
          [subtleTextColorVar]: theme.colors["fg.default"],
        },
      }),
      primary: style({
        vars: {
          [accentColorVar]: theme.colors["bg.brand.solid"],
          [solidAccentColorVar]: theme.colors["bg.brand.solid.hover"],
          [subtleAccentColorVar]: theme.colors["bg.brand"],
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
      outline: style({
        backgroundColor: "transparent",
        border: `1px solid ${accentColorVar}`,
        color: fallbackVar(subtleTextColorVar, accentColorVar),
        paddingInline: `calc(${paddingInlineVar} - 1px)`,

        selectors: {
          "&:hover:not([data-disabled])": {
            backgroundColor: subtleAccentColorVar,
          },
          "&[data-disabled]": {
            borderColor: theme.colors["border.disabled"],
            color: theme.colors["fg.disabled"],
          },
        },
      }),
      solid: style({
        backgroundColor: accentColorVar,
        color: fallbackVar(
          solidTextColorVar,
          theme.colors["fg.default.inverse"],
        ),

        selectors: {
          "&:hover:not([data-disabled])": {
            backgroundColor: solidAccentColorVar,
          },
          "&[data-disabled]": {
            backgroundColor: theme.colors["bg.input.disabled"],
            border: `1px solid ${theme.colors["border.disabled"]}`,
            color: theme.colors["fg.disabled"],
            paddingInline: `calc(${paddingInlineVar} - 1px)`,
          },
        },
      }),
      subtle: style({
        backgroundColor: "transparent",
        borderColor: accentColorVar,
        color: fallbackVar(subtleTextColorVar, accentColorVar),

        selectors: {
          "&:hover:not([data-disabled])": {
            backgroundColor: subtleAccentColorVar,
          },
          "&[data-disabled]": {
            backgroundColor: theme.colors["bg.input.disabled"],
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
        colorScheme: "neutral",
        variant: "outline",
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "2px",
        },
      }),
      variants: {
        iconOnly: true,
        size: "sm",
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "4px",
        },
      }),
      variants: {
        iconOnly: false,
        size: "sm",
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "6px",
        },
      }),
      variants: {
        iconOnly: true,
        size: "md",
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "8px",
        },
      }),
      variants: {
        iconOnly: false,
        size: "md",
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "10px",
        },
      }),
      variants: {
        iconOnly: true,
        size: "lg",
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "12px",
        },
      }),
      variants: {
        iconOnly: false,
        size: "lg",
      },
    },
  ],
});

export const icon = recipe({
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
