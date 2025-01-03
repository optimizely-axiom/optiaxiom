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
      "3xl": [
        {
          fontSize: "4xl",
          size: "3xl",
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
