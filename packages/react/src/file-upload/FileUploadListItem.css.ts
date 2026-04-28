import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const item = recipe({
  base: [
    {
      alignItems: "center",
      flexDirection: "row",
      fontSize: "md",
      gap: "6",
      p: "6",
      rounded: "md",
      transition: "colors",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      position: "relative",

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`&:has(${marker}:hover)`]: {
              backgroundColor: theme.colors["bg.default.hovered"],
            },
          },
        },
      },
    }),
  ],
});

export const name = recipe({
  base: [
    {
      rounded: "md",
      textAlign: "start",
    },
    marker,
  ],
});
