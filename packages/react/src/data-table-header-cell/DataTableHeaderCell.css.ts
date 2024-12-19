import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const button = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      gap: "4",
      justifyContent: "start",
      transition: "colors",
      w: "full",
    },
    marker,
    style({
      color: theme.colors["fg.tertiary"],
      textDecoration: "none",
      userSelect: "none",

      selectors: {
        "&::after": {
          content: "",
          inset: "0",
          position: "absolute",
        },
        "&:focus-visible": {
          outline: "none",
          zIndex: "10",
        },
        "&:focus-visible::after": {
          borderRadius: theme.borderRadius.md,
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "-2px",
        },
        "&:hover": {
          color: theme.colors["fg.secondary"],
        },
      },
    }),
  ],
});
