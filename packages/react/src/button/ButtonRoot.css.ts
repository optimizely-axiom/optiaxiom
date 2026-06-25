import { theme } from "@optiaxiom/globals";

import {
  createVar,
  fallbackVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";
import { groupStyle } from "./groupStyle";
import { opalRingImage } from "./opalRingImage";

export const accentColorVar = createVar();
const hoverAccentColorVar = createVar();
const pressedAccentColorVar = createVar();
const solidOutlineColorVar = createVar();
export const solidTextColorVar = createVar();
const subtleHoverAccentColorVar = createVar();
const subtleHoverOutlineColorVar = createVar();
const subtlePressedAccentColorVar = createVar();
const subtleOutlineColorVar = createVar();
export const textColorVar = createVar();
const transparentHoverAccentColorVar = createVar();
const transparentPressedAccentColorVar = createVar();
const borderWidthVar = createVar();

// outline-opal masked ring: the AVIF fills the border-box, a flat bg.default
// layer (padding-box clip) masks out the centre, leaving only the border showing
// as a textured ring. Each pseudo is sized by its border `width` and pulled
// OUTWARD by that same width (negative inset) so it sits behind the button and
// spills past its edge: ::before is the base ring, ::after the larger ring that
// fades in on hover.
const opalRing = (width: string) =>
  ({
    backgroundClip: "padding-box, border-box",
    backgroundColor: theme.colors["bg.default"],
    backgroundImage: `
    linear-gradient(
      ${theme.colors["bg.default"]},
      ${theme.colors["bg.default"]}
    ),
    url("data:image/avif;base64,${opalRingImage}")
  `,
    backgroundOrigin: "border-box",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    border: `${width} solid transparent`,
    // Inherit so the ring follows any radius override (e.g. pill on sm).
    borderRadius: "inherit",
    content: "",
    inset: `calc(-1 * ${width})`,
    pointerEvents: "none",
    position: "absolute",
    zIndex: "-1",
  }) as const;

export const paddingInlineVar = createVar();

export const className = style({});

export const buttonBase = recipe({
  base: [
    className,
    {
      alignItems: "center",
      display: "inline-flex",
      flexDirection: "row",
      fontWeight: "500",
      justifyContent: "flex-start",
      transition: "colors",
    },
    style({
      vars: {
        [borderWidthVar]: "1px",
      },

      borderRadius: theme.borderRadius.md,
      cursor: "pointer",
      fontFamily:
        "DI Grotesk B, Roboto Condensed Variable, system-ui, sans-serif",
      paddingInline: paddingInlineVar,
      position: "relative",
      textDecoration: "none",
      userSelect: "none",

      selectors: {
        "&:is(:focus-visible, :has(:focus-visible)):not([data-disabled])": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "2px",
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
          [borderWidthVar]: "2px",
          [hoverAccentColorVar]: theme.colors["bg.error.hovered"],
          [pressedAccentColorVar]: theme.colors["bg.error.pressed"],
          [solidTextColorVar]: theme.colors["fg.white"],
          [subtleHoverAccentColorVar]: theme.colors["bg.error.subtlest"],
          [subtleHoverOutlineColorVar]: theme.colors["border.error"],
          [subtleOutlineColorVar]: theme.colors["border.error"],
          [subtlePressedAccentColorVar]: theme.colors["bg.error.subtle"],
          [textColorVar]: theme.colors["fg.error"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["bg.default.inverse"],
          [hoverAccentColorVar]: theme.colors["bg.default.inverse.hovered"],
          [pressedAccentColorVar]: theme.colors["bg.default.inverse.pressed"],
          [solidTextColorVar]: theme.colors["fg.default.inverse"],
          [subtleHoverAccentColorVar]: theme.colors["bg.default.hovered"],
          [subtleHoverOutlineColorVar]: theme.colors["border.default"],
          [subtleOutlineColorVar]: theme.colors["border.default"],
          [subtlePressedAccentColorVar]: theme.colors["bg.default.pressed"],
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
          [solidOutlineColorVar]: theme.colors["border.disabled"],
          [solidTextColorVar]: theme.colors["fg.black"],
          [subtleHoverAccentColorVar]: theme.colors["bg.accent.subtle"],
          [subtlePressedAccentColorVar]: theme.colors["bg.accent"],
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
        h: "md",
      },
      lg: {
        fontSize: "lg",
        h: "lg",
      },
    },
    /**
     * Whether button should have square shape.
     */
    square: {
      false: {},
      true: {},
    },
    variant: {
      outline: style({
        backgroundColor: theme.colors["bg.default"],
        border: `${borderWidthVar} solid ${fallbackVar(subtleOutlineColorVar, accentColorVar)}`,
        color: fallbackVar(textColorVar, accentColorVar),
        paddingInline: `calc(${paddingInlineVar} - ${borderWidthVar})`,

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
            backgroundColor: theme.colors["bg.accent"],
            borderColor: theme.colors["fg.accent"],
            color: theme.colors["fg.black"],
          },
          "&[data-disabled]:not([data-loading])": {
            backgroundColor: theme.colors["bg.secondary"],
            borderColor: "transparent",
            color: theme.colors["fg.disabled"],
          },
        },
      }),
      "outline-opal": style({
        vars: {
          [borderWidthVar]: "2px",
        },

        border: `${borderWidthVar} solid transparent`,
        color: fallbackVar(textColorVar, accentColorVar),
        paddingInline: `calc(${paddingInlineVar} - ${borderWidthVar})`,
        zIndex: "1",

        "::after": {
          ...opalRing("4px"),
          opacity: "0",
          transition: `opacity ${theme.duration.md} ease`,
        },
        "::before": opalRing(borderWidthVar),

        "@media": {
          "(hover: hover)": {
            selectors: {
              "&:hover:not([data-disabled], [data-loading])::after": {
                opacity: "1",
              },
            },
          },
        },

        selectors: {
          "&[data-disabled]:not([data-loading])": {
            backgroundColor: theme.colors["bg.secondary"],
            color: theme.colors["fg.disabled"],
          },
          "&[data-disabled]:not([data-loading])::after": {
            backgroundImage: "none",
          },
          "&[data-disabled]:not([data-loading])::before": {
            backgroundImage: "none",
            borderColor: "transparent",
          },
        },
      }),
      strong: style({
        backgroundColor: accentColorVar,
        border: `${borderWidthVar} solid ${fallbackVar(solidOutlineColorVar, accentColorVar)}`,
        color: fallbackVar(solidTextColorVar, theme.colors["fg.default"]),
        paddingInline: `calc(${paddingInlineVar} - ${borderWidthVar})`,

        "@media": {
          "(hover: hover)": {
            selectors: {
              "&:hover:not(:active, [data-disabled], [data-loading])": {
                backgroundColor: hoverAccentColorVar,
                borderColor: fallbackVar(
                  solidOutlineColorVar,
                  hoverAccentColorVar,
                ),
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
            borderColor: "transparent",
            color: theme.colors["fg.disabled"],
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
            backgroundColor: theme.colors["bg.default.pressed"],
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
      style: style({
        borderRadius: theme.borderRadius.lg,
        paddingLeft: `calc(6px - ${borderWidthVar})`,
      }),
      variants: {
        intent: "primary",
        size: "lg",
        square: false,
        variant: "strong",
      },
    },
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
          [paddingInlineVar]: "6px",
        },
      }),
      variants: {
        size: "sm",
        square: false,
        variant: ["outline", "strong", "subtle"],
      },
    },
    {
      // Small outline-opal: pill radius, with extra inline padding to clear the
      // rounded ends.
      style: style({
        borderRadius: theme.borderRadius.full,
        vars: {
          [paddingInlineVar]: "10px",
        },
      }),
      variants: {
        size: "sm",
        square: false,
        variant: "outline-opal",
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
          [paddingInlineVar]: "8px",
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
