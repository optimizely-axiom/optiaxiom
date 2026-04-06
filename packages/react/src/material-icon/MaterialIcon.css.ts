import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const icon = recipe({
  base: [
    {
      flex: "none",
    },
    style({
      fill: "currentColor",
    }),
  ],
});

export const path = recipe({
  base: style({
    transition: `clip-path ${theme.duration.md}`,
  }),

  variants: {
    filled: {
      false: {},
      true: {},
    },
    type: {
      filled: {},
      unfilled: {},
    },
  },

  variantsCompounded: [
    {
      style: style({
        clipPath: "polygon(100% 0, 100% 0, 100% 0)",
      }),
      variants: {
        filled: false,
        type: "filled",
      },
    },
    {
      style: style({
        clipPath: "polygon(0 -100%, 200% 100%, 0 100%)",
      }),
      variants: {
        filled: false,
        type: "unfilled",
      },
    },
    {
      style: style({
        clipPath: "polygon(-100% 0, 100% 200%, 100% 0)",
      }),
      variants: {
        filled: true,
        type: "filled",
      },
    },
    {
      style: style({
        clipPath: "polygon(0 100%, 0 100%, 0 100%)",
      }),
      variants: {
        filled: true,
        type: "unfilled",
      },
    },
  ],
});
