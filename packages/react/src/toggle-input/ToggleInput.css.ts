import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";
import * as styles from "./ToggleInputHiddenInput.css";

const input = styles.className;

export const className = style({});
export const controlAccentVar = createVar();
export const controlColorVar = createVar();

export const toggleInput = recipe({
  base: [
    className,
    {
      alignItems: "start",
      display: "inline-flex",
      gap: "8",
    },
    style({
      vars: {
        [controlAccentVar]: theme.colors["border.control"],
        [controlColorVar]: theme.colors["border.control"],
      },

      color: theme.colors["fg.default"],
      position: "relative",

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`&:has(${input}:not(:disabled):is(:checked, [type=checkbox]:indeterminate)):hover`]:
              {
                vars: {
                  [controlAccentVar]: theme.colors["bg.accent.hovered"],
                },
              },
            [`&:has(${input}:not(:disabled):not(:checked, [type=checkbox]:indeterminate)):hover`]:
              {
                vars: {
                  [controlAccentVar]: theme.colors["border.control.hovered"],
                },
              },
          },
        },
      },

      selectors: {
        [`&:has(${input}:not(:disabled):is(:checked, [type=checkbox]:indeterminate))`]:
          {
            vars: {
              [controlAccentVar]: theme.colors["bg.accent"],
              [controlColorVar]: theme.colors["fg.black"],
            },
          },

        [`&:has(${input}:disabled)`]: {
          vars: {
            [controlAccentVar]: theme.colors["fg.disabled"],
            [controlColorVar]: theme.colors["fg.default.inverse"],
          },

          color: theme.colors["fg.disabled"],
        },
        [`&:not(:has(${input}:disabled))`]: {
          cursor: "pointer",
        },
      },
    }),
  ],
});
