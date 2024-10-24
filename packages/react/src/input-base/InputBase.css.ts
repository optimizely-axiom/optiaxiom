import { theme } from "@optiaxiom/globals";

import * as styles from "../button-group/ButtonGroup.css";
import {
  recipe,
  type RecipeVariants,
  responsiveStyle,
  style,
} from "../vanilla-extract";

const group = styles.className;

const marker = style({});

export const wrapper = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "0",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      borderColor: theme.colors["border.default"],
      borderRadius: theme.borderRadius.md,
      borderWidth: "1px",
      color: theme.colors["fg.default"],

      selectors: {
        [`&:has(${marker}:focus):is([data-invalid])`]: {
          outline: `2px solid ${theme.colors["bg.error.light"]}`,
          outlineOffset: "1px",
        },
        [`&:has(${marker}:focus):not([data-invalid]):not([data-readonly])`]: {
          borderColor: theme.colors["border.accent"],
        },
        [`&:has(${marker}:focus):not([data-invalid])`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        [`&:has(${marker}:focus)`]: {
          zIndex: theme.zIndex["10"],
        },

        "&:hover": {
          borderColor: theme.colors["border.active"],
        },
        "&[data-invalid]": {
          borderColor: theme.colors["border.error"],
        },
        "&[data-readonly]": {
          borderColor: theme.colors["border.tertiary"],
        },

        "&[data-disabled]": {
          backgroundColor: theme.colors["bg.secondary"],
          borderColor: theme.colors["border.secondary"],
          color: theme.colors["fg.disabled"],
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
});

export const input = recipe({
  base: [
    marker,
    {
      bg: "transparent",
      flex: "auto",
      w: "full",
    },
    style({
      /*
        line-height was set to 22px to adjust for the 1px border on top and bottom
      */
      fontSize: "16px",
      lineHeight: "22px",
      minWidth: "0",
      outline: "2px solid transparent",

      selectors: {
        "&::placeholder": {
          color: theme.colors["fg.tertiary"],
        },
        "&[data-disabled]::placeholder": {
          color: theme.colors["fg.disabled"],
        },
        "&[data-readonly]": {
          cursor: "default",
        },
      },
    }),
    responsiveStyle({
      /*
        Explicitly use 16px on mobile because otherwise iOS will zoom in on the page anytime the input is focused
      */
      sm: {
        fontSize: "14px",
      },
    }),
  ],

  variants: {
    size: {
      md: {
        px: "8",
        py: "4",
      },
      lg: {
        p: "8",
      },
    },
  },
});

export const decorator = recipe({
  variants: {
    position: {
      end: {
        mr: "8",
      },
      start: {
        ml: "8",
      },
    },
  },
});

export type InputVariants = RecipeVariants<typeof input>;
