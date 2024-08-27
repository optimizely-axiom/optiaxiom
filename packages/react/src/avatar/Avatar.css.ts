import { theme } from "../styles";
import { mapValues } from "../utils";
import { style } from "../vanilla-extract";
import { type RecipeVariants, recipe } from "../vanilla-extract";
import * as styles from "./../avatar-group/AvatarGroup.css";

export const avatar = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
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
          outline: `1px solid ${theme.colors["white"]}`,
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
        bg: `${color}.500`,
        color: "white",
      }),
    ),
    size: {
      xs: { fontSize: "xs", size: "xs" },
      sm: { fontSize: "xs", size: "sm" },
      md: { fontSize: "md", size: "md" },
      lg: { fontSize: "2xl", size: "48" },
      xl: { fontSize: "4xl", size: "80" },
    },
  },
});

export type AvatarVariants = RecipeVariants<typeof avatar>;

export const fallback = recipe({
  base: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    rounded: "inherit",
    size: "full",
    textTransform: "uppercase",
  },

  variants: {
    size: {
      xs: style({ padding: "3px 0.5px" }),
      sm: style({ padding: "5px 2.5px" }),
      md: style({ padding: "6px 3px" }),
      lg: style({ padding: "10px 5px" }),
      xl: style({ padding: "18px 10px" }),
    },
  },
});
