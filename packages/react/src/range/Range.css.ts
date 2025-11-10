import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

const rootMarker = style({});

export const root = recipe({
  base: [
    rootMarker,
    {
      alignItems: "center",
      display: "flex",
      h: "20",
    },
    style({
      position: "relative",
      touchAction: "none",
      userSelect: "none",
      width: "100%",

      selectors: {
        [`&:not([data-disabled])`]: {
          cursor: "pointer",
        },
        [`&[data-disabled]`]: {
          cursor: "not-allowed",
          opacity: 0.5,
        },
      },
    }),
  ],
});

export const track = recipe({
  base: [
    {
      display: "flex",
      flex: "1",
      rounded: "full",
    },
    style({
      backgroundColor: theme.colors["bg.tertiary"],
      height: "8px",
      position: "relative",
    }),
  ],
});

export const range = recipe({
  base: [
    {
      h: "full",
      rounded: "full",
    },
    style({
      backgroundColor: theme.colors["bg.accent"],
      position: "absolute",

      selectors: {
        [`${rootMarker}[data-disabled] &`]: {
          backgroundColor: theme.colors["bg.tertiary"],
        },
      },
    }),
  ],
});

export const thumb = recipe({
  base: [
    {
      border: "1",
      display: "flex",
      h: "20",
      rounded: "full",
      shadow: "sm",
      transition: "all",
      w: "20",
    },
    style({
      backgroundColor: theme.colors["bg.default"],

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`${rootMarker}:not([data-disabled]):hover &`]: {
              backgroundColor: theme.colors["bg.accent.subtle"],
            },
          },
        },
      },

      selectors: {
        [`${rootMarker}:active &`]: {
          transform: "scale(1.1)",
        },
        [`${rootMarker}[data-disabled] &`]: {
          borderColor: theme.colors["border.tertiary"],
        },
        [`&:focus-visible`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "2px",
        },
      },
    }),
  ],
});
