import { theme } from "../theme";
import { mapValues } from "../utils";
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
          border: `1px solid ${theme.colors["neutral.00"]}`,
        },
      },
    }),
  ],

  variants: {
    colorScheme: mapValues(
      {
        blue: "blue",
        brand: "brand",
        green: "green",
        magenta: "magenta",
        neutral: "neutral",
        purple: "purple",
        red: "red",
        yellow: "yellow",
      } as const,
      (color) => ({
        bg: color === "neutral" ? "neutral.150" : `${color}.500`,
        color: color === "neutral" ? "bg.neutral.inverse" : "neutral.00",
      }),
    ),
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
