import * as styles from "../control-base/ControlBase.css";
import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const root = recipe({
  base: [
    {
      px: "12",
      py: "2",
      rounded: "full",
      transition: "colors",
    },
    style({
      backgroundColor: styles.controlColorVar,
      position: "relative",

      selectors: {
        '&[data-state="unchecked"]:not([data-disabled])': {
          backgroundColor: theme.colors["bg.disabled"],
        },
      },
    }),
  ],
});

export const thumb = recipe({
  base: [
    {
      display: "block",
      rounded: "full",
      transition: "transform",
    },
    style({
      backgroundColor: theme.colors["white"],
      transform: "translateX(-10px)",

      selectors: {
        "&:not([data-disabled])": {
          boxShadow: theme.boxShadow["sm"],
        },
        "&[data-disabled]": {
          backgroundColor: theme.colors["bg.disabled"],
        },
        '&[data-state="checked"]': {
          transform: "translateX(10px)",
        },
      },
    }),
  ],
  variants: {
    size: {
      md: {
        size: "16",
      },
      lg: {
        size: "20",
      },
    },
  },
});

export type SwitchVariants = RecipeVariants<typeof thumb>;
