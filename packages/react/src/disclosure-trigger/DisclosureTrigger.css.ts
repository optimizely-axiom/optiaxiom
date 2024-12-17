import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const trigger = recipe({
  base: [
    {
      flexDirection: "row",
      fontSize: "md",
      fontWeight: "500",
      gap: "4",
      p: "8",
      px: "4",
      rounded: "md",
      textAlign: "start",
      w: "full",
    },
    style({
      color: theme.colors["fg.default"],

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        "&:is([data-disabled], :hover)": {
          color: theme.colors["fg.secondary"],
        },
      },
    }),
  ],
});
export const icon = recipe({
  base: [
    {
      transition: "transform",
    },
  ],
  variants: {
    chevronPosition: {
      end: style({
        selectors: {
          "[data-state=open] > &": {
            transform: "rotate(180deg)",
          },
        },
      }),
      start: style({
        selectors: {
          "[data-state=open] > &": {
            transform: "rotate(90deg)",
          },
        },
      }),
    },
  },
});
