import { theme } from "@optiaxiom/globals";

import * as styles from "../toggle-input/ToggleInput.css";
import { recipe, type RecipeVariants, style } from "../vanilla-extract";

const marker = style({});
const inputMarker = style({});

export const container = recipe({
  base: [
    marker,
    style({
      vars: {
        [styles.controlColorVar]: theme.colors["bg.tertiary"],
      },

      selectors: {
        [`&:has(${inputMarker}:not(:disabled):not(:checked)):hover`]: {
          vars: {
            [styles.controlColorVar]: theme.colors["bg.tertiary.hovered"],
          },
        },
      },
    }),
  ],
});

export const input = recipe({
  base: inputMarker,
});

export const control = recipe({
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
      backgroundColor: theme.colors["bg.default"],
      transform: "translateX(-10px)",

      selectors: {
        [`${marker}:has(${inputMarker}:checked) &`]: {
          transform: "translateX(10px)",
        },
        [`${marker}:has(${inputMarker}:disabled) &`]: {
          backgroundColor: theme.colors["bg.page"],
        },
        [`${marker}:has(${inputMarker}:not(:disabled)) &`]: {
          boxShadow: theme.boxShadow["sm"],
        },
      },
    }),
  ],
  variants: {
    size: {
      md: {
        size: "2xs",
      },
      lg: {
        size: "xs",
      },
    },
  },
});

export type SwitchVariants = RecipeVariants<typeof thumb>;
