import { theme } from "../styles";
import { mapValues } from "../utils";
import { style } from "../vanilla-extract";
import { type RecipeVariants, recipe } from "../vanilla-extract";
import * as styles from "./../avatar-group/AvatarGroup.css";

export const avatar = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      justifyContent: "center",
      overflow: "hidden",
      rounded: "full",
    },
    style({
      userSelect: "none",

      selectors: {
        [`${styles.className} &:not(:first-child)`]: {
          marginLeft: "-3px",
        },
        [`${styles.className} &`]: {
          border: `1px solid ${theme.colors["white"]}`,
        },
      },
    }),
  ],

  variants: {
    colorScheme: mapValues(
      {
        blue: "blue",
        brand: "brand",
        dark: "dark",
        gray: "gray",
        green: "green",
        magenta: "magenta",
        neutral: "neutral",
        orange: "orange",
        purple: "purple",
        red: "red",
        slate: "slate",
        yellow: "yellow",
      } as const,
      (color) => ({
        bg: color === "neutral" ? "neutral.150" : `${color}.500`,
        color: color === "neutral" ? "bg.neutral.inverse" : "white",
      }),
    ),
    size: {
      xs: { fontSize: "xs", size: "xs" },
      sm: { fontSize: "xs", size: "sm" },
      md: { fontSize: "md", size: "md" },
      xl: { fontSize: "2xl", size: "lg" },
      "5xl": { fontSize: "4xl", size: "5xl" },
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
      xs: style({ width: "12px" }),
      sm: style({ width: "14px" }),
      md: style({ width: "16px" }),
      xl: style({ width: "20px" }),
      "5xl": style({ width: "30px" }),
    },
  },
});

export type AvatarVariants = RecipeVariants<typeof avatar>;
