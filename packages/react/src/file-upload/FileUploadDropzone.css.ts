import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";

const bgColorVar = createVar();

export const dropzone = recipe({
  base: [
    {
      alignItems: "center",
      border: "1",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      fontSize: "md",
      gap: "8",
      justifyContent: "center",
      p: "16",
      rounded: "lg",
      textAlign: "center",
      transition: "colors",
    },
    style({
      vars: {
        [bgColorVar]: theme.colors["bg.default"],
      },

      backgroundColor: bgColorVar,
      borderStyle: "dashed",
    }),
  ],

  variants: {
    drag: {
      accept: [
        {
          borderColor: "border.success",
        },
        style({
          vars: {
            [bgColorVar]: theme.colors["bg.success.subtle"],
          },
        }),
      ],
      default: style({
        "@media": {
          "(hover: hover)": {
            selectors: {
              "&:hover": {
                vars: {
                  backgroundColor: theme.colors["bg.secondary"],
                },
              },
            },
          },
        },
      }),
      reject: [
        {
          borderColor: "border.error",
        },
        style({
          vars: {
            [bgColorVar]: theme.colors["bg.error.subtlest"],
          },
        }),
      ],
    },
  },
});
