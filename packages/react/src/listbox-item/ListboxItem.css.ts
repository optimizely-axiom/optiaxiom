import { theme } from "@optiaxiom/globals";

import {
  createVar,
  fallbackVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const hoveredBgColorVar = createVar();
const pressedBgColorVar = createVar();
const hoveredTextColorVar = createVar();
const pressedTextColorVar = createVar();
const textColorVar = createVar();

export const item = recipe({
  base: [
    {
      flexDirection: "row",
      fontSize: "md",
      gap: "xs",
      p: "xs",
      rounded: "sm",
      transition: "colors",
    },
    style({
      userSelect: "none",

      selectors: {
        "&:any-link": {
          textDecoration: "none",
        },
        "&:focus-visible": {
          outline: "2px solid transparent",
        },
        "&:not([data-disabled])": {
          color: textColorVar,
          cursor: "pointer",
        },
        "&:not([data-disabled])[data-highlighted]": {
          backgroundColor: hoveredBgColorVar,
          color: fallbackVar(hoveredTextColorVar, textColorVar),
        },
        "&:not([data-disabled])[data-highlighted]:active": {
          backgroundColor: pressedBgColorVar,
          color: fallbackVar(pressedTextColorVar, textColorVar),
        },
        "&:not([data-disabled])[data-highlighted][data-focus-visible]": {
          outlineOffset: "-2px",
        },
        "&[data-disabled]": {
          opacity: 0.3,
        },
      },
    }),
  ],

  variants: {
    intent: {
      danger: style({
        vars: {
          [hoveredBgColorVar]: theme.colors["bg.error.subtlest"],
          [hoveredTextColorVar]: theme.colors["fg.error.hovered"],
          [pressedBgColorVar]: theme.colors["bg.error.subtle"],
          [pressedTextColorVar]: theme.colors["fg.error.strong"],
          [textColorVar]: theme.colors["fg.error"],
        },
      }),
      neutral: style({
        vars: {
          [hoveredBgColorVar]: theme.colors["bg.default.hovered"],
          [pressedBgColorVar]: theme.colors["bg.default.pressed"],
          [textColorVar]: theme.colors["fg.default"],
        },
      }),
    },
  },
});

export const title = recipe({
  base: [
    {
      alignItems: "center",
      flexDirection: "row",
      gap: "xs",
    },
    style({
      lineHeight: "24px",
    }),
  ],
});

export const description = recipe({
  base: [
    {
      fontSize: "sm",
    },
    style({
      color: theme.colors["fg.tertiary"],
    }),
  ],
});

export type ItemVariants = RecipeVariants<typeof item>;
