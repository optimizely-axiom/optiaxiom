import { theme } from "@optiaxiom/globals";

import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const bgColorVar = createVar();
const bgColorPressedVar = createVar();
const accentColorVar = createVar();

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
          color: accentColorVar,
          cursor: "pointer",
        },
        "&:not([data-disabled])[data-highlighted]": {
          backgroundColor: bgColorVar,
        },
        "&:not([data-disabled])[data-highlighted]:active": {
          backgroundColor: bgColorPressedVar,
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
          [accentColorVar]: theme.colors["fg.error"],
          [bgColorPressedVar]: theme.colors["bg.error.subtle"],
          [bgColorVar]: theme.colors["bg.error.subtlest"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["fg.default"],
          [bgColorPressedVar]: theme.colors["bg.secondary.hovered"],
          [bgColorVar]: theme.colors["bg.secondary"],
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
