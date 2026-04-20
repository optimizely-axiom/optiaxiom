import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const body = recipe({
  base: [
    {
      flexDirection: "column",
      gap: "16",
    },
    marker,
  ],
  variants: {
    truncate: {
      false: {},
      true: [
        {
          maxH: "sm",
          overflow: "auto",
          p: "4",
        },
        style({
          margin: "-4px",
        }),
      ],
    },
  },
});

export const scrollIndicator = recipe({
  base: [
    {
      bg: "bg.secondary",
      border: "1",
      borderColor: "border.secondary",
      color: "fg.secondary",
      display: "grid",
      flex: "none",
      placeItems: "center",
      pointerEvents: "none",
      rounded: "full",
      shadow: "sm",
      size: "lg",
      transition: "opacity",
    },
    style({
      alignSelf: "center",
      bottom: "8px",
      marginTop: "-56px", // size (40px) + gap (16px) = 56px
      opacity: 0,
      position: "sticky",
      zIndex: 10,

      selectors: {
        [`${marker}[data-can-scroll] &`]: {
          opacity: 1,
        },
      },
    }),
  ],
});
