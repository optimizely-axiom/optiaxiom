import { theme } from "@optiaxiom/globals";

import {
  createVar,
  fallbackVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";
import { groupStyle } from "./groupStyle";

const accentColorVar = createVar();
const hoverAccentColorVar = createVar();
const pressedAccentColorVar = createVar();
const solidTextColorVar = createVar();
const subtleHoverAccentColorVar = createVar();
const subtleHoverOutlineColorVar = createVar();
const subtlePressedAccentColorVar = createVar();
const subtleOutlineColorVar = createVar();
export const textColorVar = createVar();
const transparentHoverAccentColorVar = createVar();
const transparentPressedAccentColorVar = createVar();

export const paddingInlineVar = createVar();

export const className = style({});

export const buttonBase = recipe({
  base: [
    className,
    {
      alignItems: "center",
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "flex-start",
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
        "&:is(:focus-visible, :has(:focus-visible)):not([data-disabled], [data-loading])":
          {
            outline: `2px solid ${theme.colors["border.focus"]}`,
            outlineOffset: "1px",
            zIndex: "10",
          },
        "&[data-disabled]": {
          cursor: "not-allowed",
        },
        ...groupStyle(),
      },
    }),
  ],
  variants: {
    intent: {
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
          [solidTextColorVar]: theme.colors["fg.default.inverse"],
          [subtleHoverAccentColorVar]: theme.colors["bg.page"],
          [subtleHoverOutlineColorVar]: theme.colors["border.default"],
          [subtleOutlineColorVar]: theme.colors["border.default"],
          [subtlePressedAccentColorVar]: theme.colors["bg.secondary"],
          [textColorVar]: theme.colors["fg.default"],
          [transparentHoverAccentColorVar]: theme.colors["bg.default.hovered"],
          [transparentPressedAccentColorVar]:
            theme.colors["bg.default.pressed"],
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
    /**
     * Control the size of the button.
     */
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
    /**
     * Whether button should have square shape.
     */
    square: {
      false: style({
        minWidth: "fit-content",
      }),
      true: {},
    },
    variant: {
      opal: style({
        backgroundImage: `linear-gradient(135deg, #392ECF 15%, #7740EC 85%)`,
        color: fallbackVar(solidTextColorVar, theme.colors["fg.white"]),

        selectors: {
          "&[data-disabled]:not([data-loading])": {
            backgroundColor: theme.colors["bg.secondary"],
            backgroundImage: "none",
            border: `1px solid ${theme.colors["border.disabled"]}`,
            color: theme.colors["fg.disabled"],
            paddingInline: `calc(${paddingInlineVar} - 1px)`,
          },
        },
      }),
      outline: style({
        backgroundColor: theme.colors["bg.default"],
        border: `1px solid ${fallbackVar(subtleOutlineColorVar, accentColorVar)}`,
        color: fallbackVar(textColorVar, accentColorVar),
        paddingInline: `calc(${paddingInlineVar} - 1px)`,

        "@media": {
          "(hover: hover)": {
            selectors: {
              '&:hover:not(:active, [data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
                {
                  backgroundColor: subtleHoverAccentColorVar,
                  borderColor: fallbackVar(
                    subtleHoverOutlineColorVar,
                    hoverAccentColorVar,
                  ),
                },
            },
          },
        },

        selectors: {
          '&:active:not([data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
            {
              backgroundColor: subtlePressedAccentColorVar,
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
          "&[data-disabled]:not([data-loading])": {
            borderColor: theme.colors["border.disabled"],
            color: theme.colors["fg.disabled"],
          },
        },
      }),
      strong: style({
        backgroundColor: accentColorVar,
        color: fallbackVar(solidTextColorVar, theme.colors["fg.white"]),

        "@media": {
          "(hover: hover)": {
            selectors: {
              "&:hover:not(:active, [data-disabled], [data-loading])": {
                backgroundColor: hoverAccentColorVar,
              },
            },
          },
        },

        selectors: {
          "&:active:not([data-disabled], [data-loading])": {
            backgroundColor: pressedAccentColorVar,
          },

          "&[data-disabled]:not([data-loading])": {
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
        color: fallbackVar(textColorVar, accentColorVar),

        "@media": {
          "(hover: hover)": {
            selectors: {
              '&:hover:not(:active, [data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
                {
                  backgroundColor: fallbackVar(
                    transparentHoverAccentColorVar,
                    subtleHoverAccentColorVar,
                  ),
                },
            },
          },
        },

        selectors: {
          '&:active:not([data-disabled], [data-loading], [data-state="active"], [data-state="on"])':
            {
              backgroundColor: fallbackVar(
                transparentPressedAccentColorVar,
                subtlePressedAccentColorVar,
              ),
            },

          '&:is([data-state="active"], [data-state="on"])': {
            backgroundColor: theme.colors["bg.accent.subtle"],
            color: theme.colors["fg.accent"],
          },
          "&[data-disabled]:not([data-loading])": {
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
        size: "sm",
        square: true,
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "4px",
        },
      }),
      variants: {
        size: "sm",
        square: false,
      },
    },
    {
      style: {
        w: "md",
      },
      variants: {
        size: "md",
        square: true,
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "8px",
        },
      }),
      variants: {
        size: "md",
        square: false,
      },
    },
    {
      style: {
        w: "lg",
      },
      variants: {
        size: "lg",
        square: true,
      },
    },
    {
      style: style({
        vars: {
          [paddingInlineVar]: "12px",
        },
      }),
      variants: {
        size: "lg",
        square: false,
      },
    },
  ],
});

export const spinner = recipe({
  base: [
    {
      size: "2xs",
    },
    style({
      left: "0",
      position: "absolute",
      right: "0",
    }),
  ],
});

export type ButtonVariants = RecipeVariants<typeof buttonBase>;
