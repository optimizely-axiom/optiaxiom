import * as styles from "../button-group/ButtonGroup.css";
import { theme } from "../styles";
import { createVar, fallbackVar, style } from "../vanilla-extract";
import { type RecipeVariants, recipe } from "../vanilla-extract";

const group = styles.className;

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
      justifyContent: "center",
      transition: "colors",
    },
    style({
      borderRadius: theme.borderRadius.md,
      cursor: "pointer",
      paddingInline: paddingInlineVar,
      position: "relative",
      textDecoration: "none",
      userSelect: "none",

      selectors: {
        "&:active:not([data-disabled])": {
          boxShadow: theme.boxShadow.inner,
        },
        "&:is(:focus-visible, :has(:focus-visible)):not([data-disabled])": {
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
          [accentColorVar]: theme.colors["bg.neutral.inverse"],
          [solidAccentColorVar]: theme.colors["bg.neutral.inverse.hover"],
          [solidTextColorVar]: theme.colors["fg.default.inverse"],
          [subtleAccentColorVar]: theme.colors["bg.input.disabled"],
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
      false: style({
        minWidth: "fit-content",
      }),
      true: {},
    },
    size: {
      sm: {
        fontSize: "sm",
        h: "sm",
      },
      md: {
        fontSize: "md",
        gap: "2",
        h: "md",
      },
      lg: {
        fontSize: "md",
        gap: "4",
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
          '&:hover:not(:is([data-disabled], [data-state="active"]))': {
            backgroundColor: subtleAccentColorVar,
          },
          "&[data-disabled]": {
            color: theme.colors["fg.disabled"],
          },
          '&[data-state="active"]': {
            backgroundColor: theme.colors["bg.brand"],
            color: theme.colors["fg.link"],
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
  base: {
    h: "auto",
    w: "20",
  },
});

export const label = recipe({
  base: {
    flexDirection: "row",
    gap: "4",
    mx: "4",
  },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
