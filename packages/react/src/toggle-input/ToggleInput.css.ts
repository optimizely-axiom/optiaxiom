import { theme } from "@optiaxiom/globals";

import * as styles from "../toggle-input-hidden-input/ToggleInputHiddenInput.css";
import { createVar, recipe, style } from "../vanilla-extract";

const input = styles.className;

export const className = style({});
export const controlColorVar = createVar();

export const toggleInput = recipe({
  base: [
    className,
    {
      alignItems: "start",
      display: "inline-flex",
      flexDirection: "row",
      gap: "8",
    },
    style({
      vars: {
        [controlColorVar]: theme.colors["border.control"],
      },

      color: theme.colors["fg.default"],
      position: "relative",

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`&:has(${input}:not(:disabled):checked):hover`]: {
              vars: {
                [controlColorVar]: theme.colors["bg.accent.hovered"],
              },
            },
            [`&:has(${input}:not(:disabled):not(:checked)):hover`]: {
              vars: {
                [controlColorVar]: theme.colors["border.control.hovered"],
              },
            },
          },
        },
      },

      selectors: {
        [`&:has(${input}:checked)`]: {
          vars: {
            [controlColorVar]: theme.colors["bg.accent"],
          },
        },

        [`&:has(${input}:disabled)`]: {
          color: theme.colors["fg.disabled"],
        },
        [`&:not(:has(${input}:disabled))`]: {
          cursor: "pointer",
        },
      },
    }),
  ],
});
