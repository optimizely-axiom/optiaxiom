import { theme } from "@optiaxiom/react/css-runtime";

import { recipe, style } from "../vanilla-extract";

export const carousel = recipe({
  base: [
    {
      flexDirection: "column",
      gap: "12",
    },
    style({
      outline: "none",
      userSelect: "none",
    }),
  ],
});

export const content = recipe({
  base: [
    {
      display: "grid",
      overflow: "hidden",
      rounded: "lg",
    },
    style({
      aspectRatio: "16 / 9",
      gridTemplateColumns: "auto 1fr auto",
      gridTemplateRows: "auto 1fr auto",
      position: "relative",
    }),
  ],
});

export const viewport = recipe({
  base: [
    {
      overflow: "hidden",
    },
    style({
      gridArea: "1 / 1 / -1 / -1",
    }),
  ],
});

export const slideContainer = recipe({
  base: [
    {
      size: "full",
    },
    style({
      backfaceVisibility: "hidden",
      display: "flex",
      touchAction: "pan-y pinch-zoom",
    }),
  ],
});

export const slide = recipe({
  base: [
    {
      objectFit: "cover",
      size: "full",
    },
    style({
      flex: "0 0 100%",
      height: "100%",
      minWidth: 0,
    }),
  ],
});

export const navButton = recipe({
  base: [
    {
      bg: "bg.default",
      display: "grid",
      mx: "16",
      placeItems: "center",
      rounded: "full",
      size: "md",
      transition: "opacity",
    },
    style({
      alignSelf: "center",
      gridRow: "2",
      opacity: 0.7,
      zIndex: 1,

      selectors: {
        "&::before": {
          content: "",
          insetBlock: "0",
          paddingLeft: "32px",
          paddingRight: "16px",
          position: "absolute",
          width: "32px",
        },
        "&:hover": {
          opacity: 1,
        },
      },
    }),
  ],
  variants: {
    side: {
      left: [
        {
          mr: "32",
        },
        style({
          gridColumn: "1",
        }),
      ],
      right: [
        {
          ml: "32",
        },
        style({
          gridColumn: "3",
        }),
      ],
    },
  },
});

export const thumbnail = recipe({
  base: [
    {
      cursor: "pointer",
      flex: "none",
      objectFit: "cover",
      overflow: "hidden",
      rounded: "lg",
      size: "80",
      transition: "opacity",
    },
    style({
      position: "relative",

      selectors: {
        "&::after": {
          borderRadius: "inherit",
          boxShadow: `inset 0 0 0 2px ${theme.colors["border.focus"]}`,
          content: "",
          inset: 0,
          opacity: 0,
          outline: `2px solid ${theme.colors["bg.default"]}`,
          outlineOffset: "-4px",
          position: "absolute",
          transition: `opacity ${theme.duration["sm"]}`,
        },
      },
    }),
  ],
  variants: {
    selected: {
      false: style({
        opacity: 0.7,
      }),
      true: style({
        opacity: 1,

        selectors: {
          "&::after": {
            opacity: 1,
          },
        },
      }),
    },
  },
});
