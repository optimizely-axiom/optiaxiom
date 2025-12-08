import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const dropzone = recipe({
  base: [
    {
      alignItems: "center",
      bg: "bg.secondary",
      flexDirection: "column",
      gap: "16",
      justifyContent: "center",
      p: "32",
      rounded: "md",
      textAlign: "center",
      transition: "colors",
    },
    style({
      isolation: "isolate",

      selectors: {
        "&::before": {
          border: `1px dashed ${theme.colors["border.default"]}`,
          borderRadius: theme.borderRadius.md,
          content: "",
          inset: 0,
          position: "absolute",
          zIndex: -1,
        },
      },
    }),
  ],

  variants: {
    drag: {
      false: {},
      true: [
        style({
          selectors: {
            "&::before": {
              border: `2px solid ${theme.colors["border.focus"]}`,
            },
          },
        }),
      ],
    },
    hidden: {
      false: style({
        visibility: "visible",
      }),
      true: style({
        visibility: "hidden",
      }),
    },
    overlay: {
      false: {
        flex: "1",
      },
      true: [
        {
          z: "10",
        },
        style({
          inset: 0,
          position: "absolute",
        }),
      ],
    },
  },
});

export const label = recipe({
  base: [
    {
      alignItems: "center",
      flexDirection: "column",
      gap: "8",
    },
  ],

  variants: {
    disabled: {
      false: {},
      true: style({
        opacity: 0.5,
      }),
    },
  },
});
