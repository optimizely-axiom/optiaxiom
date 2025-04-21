import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";
import * as styles from "./AvatarGroup.css";

export const avatar = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      fontWeight: "500",
      justifyContent: "center",
      overflow: "hidden",
      rounded: "full",
    },
    style({
      userSelect: "none",

      selectors: {
        [`${styles.className} &`]: {
          border: `1px solid ${theme.colors["bg.default"]}`,
        },
      },
    }),
  ],

  variants: {
    /**
     * Control the avatar fallback background and text colors.
     */
    colorScheme: {
      neutral: {
        bg: "bg.avatar.neutral",
        color: "fg.avatar.neutral",
      },
      purple: {
        bg: "bg.avatar.purple",
        color: "fg.avatar.purple",
      },
    },
    /**
     * Control the size of the avatar.
     */
    size: {
      "2xs": [
        {
          fontWeight: "400",
          size: "2xs",
        },
        style({
          fontSize: "8px",
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-1px",
            },
          },
        }),
      ],
      xs: [
        {
          fontWeight: "400",
          size: "xs",
        },
        style({
          fontSize: theme.fontSize.xs.fontSize,
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-3px",
            },
          },
        }),
      ],
      sm: [
        {
          size: "sm",
        },
        style({
          fontSize: theme.fontSize.xs.fontSize,
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-5px",
            },
          },
        }),
      ],
      md: [
        {
          size: "md",
        },
        style({
          fontSize: theme.fontSize.md.fontSize,
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-7px",
            },
          },
        }),
      ],
      lg: [
        {
          size: "lg",
        },
        style({
          fontSize: theme.fontSize["lg"].fontSize,
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-9px",
            },
          },
        }),
      ],
      xl: [
        {
          size: "xl",
        },
        style({
          fontSize: theme.fontSize["xl"].fontSize,
          selectors: {
            [`${styles.className} &:not(:first-child)`]: {
              marginLeft: "-11px",
            },
          },
        }),
      ],
      "3xl": [
        {
          size: "3xl",
        },
        style({
          fontSize: theme.fontSize["4xl"].fontSize,
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
      w: "auto",
    },
  ],
  variants: {
    size: {
      "2xs": { h: "10" },
      xs: { h: "10" },
      sm: { h: "12" },
      md: { h: "12" },
      lg: { h: "2xs" },
      xl: { h: "2xs" },
      "3xl": { h: "sm" },
    },
  },
});

export type AvatarVariants = RecipeVariants<typeof avatar>;
