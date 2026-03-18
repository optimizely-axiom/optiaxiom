import { theme } from "@optiaxiom/react/css-runtime";

import { recipe, style } from "../vanilla-extract";

const marker = style({});
const inputMarker = style({});

export const choiceGroup = recipe({
  base: {
    flexDirection: "column",
    gap: "8",
  },
});

export const choice = recipe({
  base: [
    {
      border: "1",
      color: "fg.default",
      flexDirection: "column",
      fontSize: "md",
      gap: "8",
      px: "16",
      py: "12",
      rounded: "lg",
      transition: "colors",
    },
    style({
      backgroundColor: theme.colors["bg.page"],
      borderColor: theme.colors["bg.page"],
      cursor: "pointer",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover": {
              backgroundColor: theme.colors["bg.secondary"],
            },
          },
        },
      },

      selectors: {
        [`&:has(${inputMarker}:checked)`]: {
          backgroundColor: theme.colors["bg.accent.subtle"],
          borderColor: theme.colors["bg.accent.light"],
        },
        [`&:has(${inputMarker}:disabled)`]: {
          cursor: "default",
          opacity: 0.5,
          pointerEvents: "none",
        },
        [`&:has(${inputMarker}:focus-visible)`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
      },
    }),
    marker,
  ],
  variants: {
    cursor: {
      text: {
        cursor: "text",
      },
    },
  },
});

export const input = recipe({
  base: inputMarker,
});

export const addon = recipe({
  base: [
    {
      display: "grid",
      fontWeight: "500",
      placeItems: "center",
      rounded: "lg",
      size: "md",
      transition: "colors",
    },
    style({
      backgroundColor: theme.colors["bg.avatar.neutral"],

      selectors: {
        [`${marker}:has(${inputMarker}:checked) &`]: {
          backgroundColor: "#CDD8FC",
        },
      },
    }),
  ],
  variants: {
    cursor: {
      pointer: {
        cursor: "pointer",
      },
    },
  },
});
