import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const button = recipe({
  base: [
    {
      alignItems: "center",
      bg: "transparent",
      borderColor: "bg.default.inverse",
      display: "flex",
      flexDirection: "row",
      fontSize: "md",
      gap: "4",
      h: "md",
      justifyContent: "center",
      my: "4",
      px: "8",
      rounded: "md",
      transition: "colors",
      whiteSpace: "nowrap",
    },
    marker,
    style({
      color: theme.colors["fg.tertiary"],
      textDecoration: "none",
      userSelect: "none",

      selectors: {
        "&:hover": {
          color: theme.colors["fg.secondary"],
        },
        "&:is(:focus-visible, :has(:focus-visible))": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
          zIndex: theme.zIndex["10"],
        },
      },
    }),
  ],
});
