import { theme } from "../theme";
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
    colorScheme: {
      blue: {
        bg: "bg.information.subtle",
        color: "fg.information.strong",
      },
      cyan: {
        bg: "bg.avatar.cyan",
        color: "fg.avatar.cyan",
      },
      green: {
        bg: "bg.success.subtle",
        color: "fg.success.strong",
      },
      magenta: {
        bg: "bg.avatar.magenta",
        color: "fg.avatar.magenta",
      },
      neutral: {
        bg: "bg.secondary",
        color: "fg.default",
      },
      purple: {
        bg: "bg.avatar.purple",
        color: "fg.avatar.purple",
      },
      red: {
        bg: "bg.error.subtle",
        color: "fg.error.strong",
      },
      yellow: {
        bg: "bg.warning.subtle",
        color: "fg.warning.strong",
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
