import * as styles from "../button-group/ButtonGroup.css";
import { theme } from "../theme";
import { createVar, fallbackVar, style } from "../vanilla-extract";
import { recipe, type RecipeVariants } from "../vanilla-extract";

const group = styles.className;

const accentColorVar = createVar();
const solidAccentColorVar = createVar();
const solidTextColorVar = createVar();
const subtleAccentColorVar = createVar();
export const subtleTextColorVar = createVar();

const paddingInlineVar = createVar();

const marker = style({});

export const button = recipe({
  base: [
    marker,
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
        "&:active:not([data-disabled], [data-loading])": {
          boxShadow: theme.boxShadow.inner,
        },
        "&:is(:focus-visible, :has(:focus-visible)):not([data-disabled], [data-loading])":
          {
            outline: `2px solid ${theme.colors["border.outline"]}`,
            outlineOffset: "1px",
            zIndex: theme.zIndex["10"],
          },
        "&:is([data-disabled], [data-loading])": {
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
          [accentColorVar]: theme.colors["bg.error.strong"],
          [solidAccentColorVar]: theme.colors["bg.error.strong.hovered"],
          [subtleAccentColorVar]: theme.colors["bg.error"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["bg.default.inverse"],
          [solidAccentColorVar]: theme.colors["bg.default.inverse.hovered"],
          [solidTextColorVar]: theme.colors["fg.default.inverse"],
          [subtleAccentColorVar]: theme.colors["bg.neutral"],
          [subtleTextColorVar]: theme.colors["fg.default"],
        },
      }),
      primary: style({
        vars: {
          [accentColorVar]: theme.colors["bg.accent.strong"],
          [solidAccentColorVar]: theme.colors["bg.accent.strong.hovered"],
          [subtleAccentColorVar]: theme.colors["bg.accent"],
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
          "&:hover:not([data-disabled], [data-loading])": {
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
          "&:hover:not([data-disabled], [data-loading])": {
            backgroundColor: solidAccentColorVar,
          },
          "&[data-disabled]": {
            backgroundColor: theme.colors["bg.neutral"],
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
          '&:hover:not([data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
            {
              backgroundColor: subtleAccentColorVar,
            },
          '&:is([data-state="active"], [data-state="on"])': {
            backgroundColor: theme.colors["bg.accent"],
            color: theme.colors["fg.accent"],
          },
          "&[data-disabled]": {
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

const loadingBase = [
  {
    transition: "opacity" as const,
  },
  style({
    opacity: "1",

    selectors: {
      [`${marker}[data-loading] &`]: {
        opacity: "0",
      },
    },
  }),
];

export const addon = recipe({
  base: loadingBase,
});

export const icon = recipe({
  base: [
    {
      h: "auto",
      w: "20",
    },
    ...loadingBase,
  ],
});

export const label = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "4",
      mx: "4",
    },
    ...loadingBase,
  ],
});

export const spinner = recipe({
  base: style({
    position: "absolute",
  }),
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
