import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const root = recipe({
  base: [
    {
      flexDirection: "row",
      fontSize: "md",
      gap: "8",
      py: "8",
      transition: "colors",
    },
    style({
      color: theme.colors["fg.default"],
      position: "relative",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:is([data-disabled], :hover)": {
              color: theme.colors["bg.default.inverse.hovered"],
            },
          },
        },
      },
    }),
  ],
});

export const trigger = recipe({
  base: [
    {
      flexDirection: "row",
      fontSize: "inherit",
      fontWeight: "inherit",
      gap: "4",
      rounded: "md",
      textAlign: "start",
      w: "full",
    },
    style({
      minHeight: theme.size.sm,
    }),
  ],
});

export const icon = recipe({
  base: [
    {
      flex: "none",
      transition: "transform",
    },
  ],
  variants: {
    chevronPosition: {
      end: style({
        selectors: {
          "[data-state=open] > &": {
            transform: "rotate(-90deg)",
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
