import { theme } from "@optiaxiom/react/css-runtime";

import { recipe, style } from "../vanilla-extract";

const marker = style({});
const inputMarker = style({});

export const choiceGroup = recipe({
  base: {
    flexDirection: "column",
  },
});

export const choice = recipe({
  base: [
    {
      color: "fg.default",
      flexDirection: "column",
      fontSize: "md",
      gap: "8",
      px: "10",
      py: "16",
      rounded: "lg",
      transition: "colors",
    },
    style({
      backgroundColor: "transparent",
      borderColor: theme.colors["border.secondary"],
      borderInlineColor: "transparent",
      borderInlineWidth: "6px",
      cursor: "pointer",

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`&:hover, &:has(${inputMarker}[type=radio]:checked)`]: {
              backgroundColor: theme.colors["bg.page"],
              borderColor: theme.colors["bg.page"],
            },
          },
        },
      },

      selectors: {
        [`&:has(${inputMarker}:disabled)`]: {
          cursor: "default",
          opacity: 0.5,
          pointerEvents: "none",
        },
        [`&:has(${inputMarker}:focus-visible)`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        [`&:has(+ ${marker}:hover, + ${marker} ${inputMarker}[type=radio]:checked)`]:
          {
            borderBottomColor: "transparent",
          },
      },
    }),
    marker,
  ],
  variants: {
    cursor: {
      pointer: {
        borderB: "1",
      },
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
