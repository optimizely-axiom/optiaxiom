import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const trigger = recipe({
  base: [
    marker,
    {
      flex: ["1", "initial"],
      fontSize: "md",
      fontWeight: "500",
      py: "4",
    },
    style({
      borderColor: `transparent`,
      color: theme.colors["fg.tertiary"],
      userSelect: "none",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        '&:hover:not([data-state="active"])': {
          borderColor: theme.colors["border.default"],
          color: theme.colors["fg.secondary"],
        },
        "&[data-disabled]": {
          color: theme.colors["fg.disabled"],
        },
        '&[data-orientation="horizontal"]': {
          borderBottomWidth: "2px",
          marginBottom: "-1px",
        },
        '&[data-orientation="vertical"]': {
          borderRightWidth: "2px",
          marginRight: "-1px",
          paddingInline: "10px",
        },
        '&[data-state="active"]': {
          borderColor: theme.colors["border.accent"],
          color: theme.colors["fg.default"],
        },
      },
    }),
  ],
});

export const content = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "8",
      justifyContent: ["center", "start"],
      py: "6",
      rounded: "sm",
    },
    style({
      selectors: {
        [`${marker}:active &`]: {
          backgroundColor: theme.colors["bg.secondary"],
        },
      },
    }),
  ],
});
