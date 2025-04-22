import { theme } from "@optiaxiom/globals";

import { groupStyle } from "../button/groupStyle";
import { recipe, style } from "../vanilla-extract";
import * as styles from "./InputControl.css";

const marker = styles.className;

export const root = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "0",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      borderColor: theme.colors["border.default"],
      borderRadius: theme.borderRadius.md,
      borderWidth: "1px",
      color: theme.colors["fg.default"],
      position: "relative",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover": {
              borderColor: theme.colors["border.control"],
            },
          },
        },
      },

      selectors: {
        [`&:has(${marker}:focus)`]: {
          zIndex: "10",
        },
        [`&:has(${marker}:focus:is([data-invalid]))`]: {
          outline: `2px solid ${theme.colors["border.focus.error"]}`,
          outlineOffset: "1px",
        },
        [`&:has(${marker}:focus:not([data-invalid]))`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        [`&:has(${marker}:focus:not([data-invalid]):not([data-readonly]))`]: {
          borderColor: theme.colors["border.accent"],
        },

        [`&:has(${marker}:is([data-invalid]))`]: {
          borderColor: theme.colors["border.error"],
        },
        [`&:has(${marker}:is([data-readonly]))`]: {
          borderColor: theme.colors["border.tertiary"],
        },

        [`&:has(${marker}:is([data-disabled]))`]: {
          backgroundColor: theme.colors["bg.secondary"],
          borderColor: theme.colors["border.secondary"],
          color: theme.colors["fg.disabled"],
        },
        ...groupStyle(),
      },
    }),
  ],
});
