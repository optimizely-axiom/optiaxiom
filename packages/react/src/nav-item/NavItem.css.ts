import { theme } from "@optiaxiom/globals";

import * as styles from "../button-base/ButtonBase.css";
import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      fontSize: "md",
      fontWeight: "500",
      h: "lg",
      justifyContent: "start",
      mx: "8",
      rounded: "md",
      textAlign: "start",
      transition: "colors",
    },
    style({
      vars: {
        [styles.textColorVar]: theme.colors["fg.secondary"],
      },

      color: theme.colors["fg.secondary"],
      textDecoration: "none",
      userSelect: "none",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover:not([data-state=active]):not(:active)": {
              backgroundColor: theme.colors["bg.default.hovered"],
              color: theme.colors["fg.default"],
            },
            "&:hover[data-state=active]:not(:active)": {
              color: theme.colors["fg.accent.hovered"],
            },
          },
        },
      },

      selectors: {
        "&:focus-visible:not([data-disabled])": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
          zIndex: "10",
        },
        "&[data-disabled]": {
          opacity: "0.32",
        },

        "&:active": {
          backgroundColor: theme.colors["bg.default.pressed"],
          color: theme.colors["fg.default"],
        },
        "&[data-state=active]": {
          backgroundColor: theme.colors["bg.accent.subtle"],
          color: theme.colors["fg.accent"],
        },
      },
    }),
  ],
});

export const label = recipe({
  base: {
    flex: "1",
    transition: "opacity",
  },

  variants: {
    expanded: {
      false: style({
        opacity: "0",
      }),
      true: style({
        opacity: "1",
      }),
    },
  },
});
