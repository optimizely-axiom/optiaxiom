import { theme } from "@optiaxiom/react/css-runtime";

import { recipe, style } from "../vanilla-extract";

export const question = recipe({
  base: [
    {
      flexDirection: "column",
    },
    style({
      outline: "none",
    }),
  ],
  variants: {
    // Collapsible spacing lives inside DisclosureContent so it animates with
    // the panel height.
    collapsible: {
      false: {
        gap: "16",
      },
      true: {},
    },
  },
});

const marker = style({});

// The revised mock insets the header 16px, inside the card's 20px padding.
export const header = recipe({
  base: [
    {
      py: "0",
    },
    style({
      marginInline: "-4px",
    }),
  ],
});

export const options = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    capped: {
      false: {},
      // A half-visible row signals the list scrolls where scrollbars stay
      // hidden until used. Padding keeps focus outlines inside the clip.
      true: style({
        margin: "-3px",
        maxHeight: "224px", // 3.5 rows of 64px
        overflowY: "auto",
        padding: "3px",
        scrollPadding: "3px", // so focusing the last row scrolls fully to the end
      }),
    },
  },
});

// Arrow keys already scroll the list, so the button is pointer-only.
export const jump = recipe({
  base: [
    // The ring of page background keeps row dividers from running into the
    // button's border as the list scrolls behind it.
    {
      bg: "bg.default",
      display: "flex",
      flex: "none",
      p: "4",
      rounded: "full",
      transition: "opacity",
    },
    // Not a sprinkle: sprinkles outrank style(), so the selector below could
    // never turn pointer events back on.
    style({
      alignSelf: "center",
      bottom: 0,
      marginTop: "-40px", // button size (32px) + ring (2 × 4px)
      opacity: 0,
      pointerEvents: "none",
      position: "sticky",
      zIndex: 1,

      selectors: {
        "[data-can-scroll] > &": {
          opacity: 1,
          pointerEvents: "auto",
        },
      },
    }),
  ],
});

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
      userSelect: "none",

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`&:hover, &[data-selected], &:has([contenteditable]:focus)`]: {
              backgroundColor: theme.colors["bg.page"],
              borderColor: theme.colors["bg.page"],
            },
          },
        },
      },

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
          zIndex: "1",
        },
        "&[data-disabled]": {
          cursor: "default",
          opacity: 0.5,
          pointerEvents: "none",
        },
        [`&:has(+ ${marker}:hover, + ${marker}[data-selected], + ${marker} [contenteditable]:focus)`]:
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
    footer: {
      false: {},
      // A flat band flush with the card's edges across its 20px padding, with
      // the divider above it.
      true: [
        {
          px: "16",
          rounded: "none",
        },
        style({
          backgroundColor: "transparent",
          borderInlineWidth: 0,
          borderTop: `1px solid ${theme.colors["border.secondary"]}`,
          marginBottom: "-20px",
          marginInline: "-20px",
          marginTop: "16px", // the same gap as the multi select footer

          "@media": {
            "(hover: hover)": {
              selectors: {
                [`&:hover, &[data-selected], &:has([contenteditable]:focus)`]: {
                  backgroundColor: "transparent",
                  borderColor: theme.colors["border.secondary"],
                },
              },
            },
          },
        }),
      ],
    },
    // The footer divider already closes the list.
    last: {
      false: {},
      true: style({
        borderBottomColor: "transparent",
      }),
    },
  },
});

export const selection = recipe({
  base: {
    borderColor: "border.secondary",
    borderT: "1",
    gap: "8",
    pt: "16",
    px: "16",
  },
  variants: {
    // Spans the card edge to edge across its 20px padding.
    bleed: {
      false: {},
      true: [
        {
          pb: "16",
        },
        style({
          marginBottom: "-20px",
          marginInline: "-20px",
        }),
      ],
    },
  },
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
