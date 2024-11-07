import { theme } from "@optiaxiom/globals";

import { style } from "../vanilla-extract";
import { recipe, type RecipeVariants } from "../vanilla-extract";
import * as styles from "./../avatar-group/AvatarGroup.css";

export const avatar = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      fontWeight: "500",
      justifyContent: "center",
      overflow: "hidden",
    },
    style({
      borderRadius: theme.borderRadius.full,
      userSelect: "none",

      selectors: {
        [`${styles.className} &`]: {
          border: `1px solid ${theme.colors["bg.default"]}`,
        },
      },
    }),
  ],

  variants: {
    colorScheme: {
      blue: {
        bg: "avatar.bg.blue",
        color: "avatar.fg.blue",
      },
      cyan: {
        bg: "avatar.bg.cyan",
        color: "avatar.fg.cyan",
      },
      green: {
        bg: "avatar.bg.green",
        color: "avatar.fg.green",
      },
      magenta: {
        bg: "avatar.bg.magenta",
        color: "avatar.fg.magenta",
      },
      neutral: {
        bg: "bg.secondary",
        color: "fg.default",
      },
      purple: {
        bg: "avatar.bg.purple",
        color: "avatar.fg.purple",
      },
      red: {
        bg: "bg.error.subtle",
        color: "fg.error.strong",
      },
      yellow: {
        bg: "avatar.bg.yellow",
        color: "avatar.fg.yellow",
      },
    },
    size: {
      xs: [
        {
          fontSize: "xs",
          fontWeight: "400",
          size: "xs",
        },
        style({
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-3px",
            },
          },
        }),
      ],
      sm: [
        {
          fontSize: "xs",
          size: "sm",
        },
        style({
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-5px",
            },
          },
        }),
      ],
      md: [
        {
          fontSize: "md",
          size: "md",
        },
        style({
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-7px",
            },
          },
        }),
      ],
      lg: [
        {
          fontSize: "lg",
          size: "lg",
        },
        style({
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-9px",
            },
          },
        }),
      ],
      xl: [
        {
          fontSize: "2xl",
          size: "xl",
        },
        style({
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-11px",
            },
          },
        }),
      ],
      "5xl": [
        {
          fontSize: "4xl",
          size: "5xl",
        },
        style({
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-13px",
            },
          },
        }),
      ],
    },
  },
});

export const fallback = recipe({
  base: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    rounded: "inherit",
    size: "full",
    textTransform: "uppercase",
  },
});

export const icon = recipe({
  base: [
    {
      h: "auto",
    },
  ],
  variants: {
    size: {
      xs: { w: "12" },
      sm: { w: "12" },
      md: { w: "16" },
      lg: { w: "20" },
      xl: { w: "20" },
      "5xl": { w: "32" },
    },
  },
});

export type AvatarVariants = RecipeVariants<typeof avatar>;
