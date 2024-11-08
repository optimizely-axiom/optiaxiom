import { theme } from "@optiaxiom/globals";

import { groupStyle } from "../button-group/groupStyle";
import { createVar, fallbackVar, style } from "../vanilla-extract";
import { recipe, type RecipeVariants } from "../vanilla-extract";

const accentColorVar = createVar();
const hoverAccentColorVar = createVar();
const pressedAccentColorVar = createVar();
const subtleHoverAccentColorVar = createVar();
const subtleHoverOutlineColorVar = createVar();
const subtlePressedAccentColorVar = createVar();
const subtleOutlineColorVar = createVar();
export const subtleTextColorVar = createVar();

const paddingInlineVar = createVar();

export const className = style({});

export const buttonBase = recipe({
  base: [
    className,
    {
      alignItems: "center",
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "center",
      transition: "colors",
    },
    style({
      borderRadius: theme.borderRadius.md,
      paddingInline: paddingInlineVar,
      position: "relative",
      textDecoration: "none",
      userSelect: "none",

      selectors: {
        "&:is(:focus-visible, :has(:focus-visible)):not([data-disabled], [data-loading])":
          {
            outline: `2px solid ${theme.colors["border.focus"]}`,
            outlineOffset: "1px",
            zIndex: theme.zIndex["10"],
          },
        ...groupStyle(),
      },
    }),
  ],
  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [accentColorVar]: theme.colors["bg.error"],
          [hoverAccentColorVar]: theme.colors["bg.error.hovered"],
          [pressedAccentColorVar]: theme.colors["bg.error.pressed"],
          [subtleHoverAccentColorVar]: theme.colors["bg.error.subtlest"],
          [subtlePressedAccentColorVar]: theme.colors["bg.error.subtle"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["bg.default.inverse"],
          [hoverAccentColorVar]: theme.colors["bg.default.inverse.hovered"],
          [pressedAccentColorVar]: theme.colors["bg.default.inverse.pressed"],
          [subtleHoverAccentColorVar]: theme.colors["bg.secondary"],
          [subtleHoverOutlineColorVar]: theme.colors["border.default"],
          [subtleOutlineColorVar]: theme.colors["border.default"],
          [subtlePressedAccentColorVar]: theme.colors["bg.secondary.hovered"],
          [subtleTextColorVar]: theme.colors["fg.default"],
        },
      }),
      primary: style({
        vars: {
          [accentColorVar]: theme.colors["bg.accent"],
          [hoverAccentColorVar]: theme.colors["bg.accent.hovered"],
          [pressedAccentColorVar]: theme.colors["bg.accent.pressed"],
          [subtleHoverAccentColorVar]: theme.colors["bg.accent.subtle"],
          [subtlePressedAccentColorVar]: theme.colors["bg.accent.light"],
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
        backgroundColor: theme.colors["bg.default"],
        border: `1px solid ${fallbackVar(subtleOutlineColorVar, accentColorVar)}`,
        color: fallbackVar(subtleTextColorVar, accentColorVar),
        paddingInline: `calc(${paddingInlineVar} - 1px)`,

        selectors: {
          '&:active:not([data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
            {
              backgroundColor: subtlePressedAccentColorVar,
              borderColor: fallbackVar(
                subtleHoverOutlineColorVar,
                hoverAccentColorVar,
              ),
            },
          '&:hover:not(:active, [data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
            {
              backgroundColor: subtleHoverAccentColorVar,
              borderColor: fallbackVar(
                subtleHoverOutlineColorVar,
                hoverAccentColorVar,
              ),
            },
          '&:is([data-state="active"], [data-state="on"])': {
            backgroundColor: theme.colors["bg.accent.subtle"],
            borderColor: theme.colors["fg.accent"],
            color: theme.colors["fg.accent"],
          },
          "&[data-disabled]": {
            borderColor: theme.colors["border.disabled"],
            color: theme.colors["fg.disabled"],
          },
        },
      }),
      solid: style({
        backgroundColor: accentColorVar,
        color: theme.colors["fg.default.inverse"],

        selectors: {
          "&:active:not([data-disabled], [data-loading])": {
            backgroundColor: pressedAccentColorVar,
          },
          "&:hover:not(:active, [data-disabled], [data-loading])": {
            backgroundColor: hoverAccentColorVar,
          },
          "&[data-disabled]": {
            backgroundColor: theme.colors["bg.secondary"],
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
          '&:active:not([data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
            {
              backgroundColor: subtlePressedAccentColorVar,
            },
          '&:hover:not(:active, [data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
            {
              backgroundColor: subtleHoverAccentColorVar,
            },
          '&:is([data-state="active"], [data-state="on"])': {
            backgroundColor: theme.colors["bg.accent.subtle"],
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
      style: {
        w: "sm",
      },
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
      style: {
        w: "md",
      },
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
      style: {
        w: "lg",
      },
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

export const spinner = recipe({
  base: style({
    position: "absolute",
  }),
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonBase>>;