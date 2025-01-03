import { theme } from "@optiaxiom/globals";

import * as styles from "../toggle-input/ToggleInput.css";
import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

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

const sizeVar = createVar();

export const thumb = recipe({
  base: [
    {
      display: "block",
      rounded: "full",
      transition: "all",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      height: sizeVar,
      transform: "translateX(-10px)",
      width: sizeVar,

      selectors: {
        [`${marker}:active &`]: {
          width: `calc(${sizeVar} * 1.25)`,
        },
        [`${marker}:active:has(${inputMarker}:checked) &`]: {
          marginLeft: `calc(${sizeVar} * -0.25)`,
        },
        [`${marker}:active:has(${inputMarker}:not(:checked)) &`]: {
          marginRight: `calc(${sizeVar} * -0.25)`,
        },
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
    /**
     * Control the size of the switch.
     */
    size: {
      md: style({
        vars: {
          [sizeVar]: theme.size["2xs"],
        },
      }),
      lg: style({
        vars: {
          [sizeVar]: theme.size["xs"],
        },
      }),
    },
  },
});

export type SwitchVariants = RecipeVariants<typeof thumb>;
