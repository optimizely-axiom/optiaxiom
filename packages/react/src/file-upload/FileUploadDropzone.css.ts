import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const dropzone = recipe({
  base: [
    {
      alignItems: "center",
      bg: "bg.secondary",
      border: "1",
      fontSize: "md",
      justifyContent: "center",
      p: "32",
      rounded: "md",
      textAlign: "center",
      transition: "colors",
      z: "10",
    },
    style({
      borderStyle: "dashed",
    }),
  ],

  variants: {
    drag: {
      false: {},
      true: [
        style({
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
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
      false: {},
      true: style({
        inset: 0,
        position: "absolute",
      }),
    },
  },
});
