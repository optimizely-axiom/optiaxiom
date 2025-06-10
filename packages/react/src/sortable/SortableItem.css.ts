import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: style({
    transitionDuration: theme.duration.md,
    transitionProperty: "box-shadow, transform",

    selectors: {
      // eslint-disable-next-line local/no-aria-selectors
      "&[aria-hidden=true]": {
        opacity: 0.5,
      },
      // eslint-disable-next-line local/no-aria-selectors
      "&[data-sortable-dragging]:not([aria-hidden=true])": {
        boxShadow: `${theme.boxShadow.lg} !important`,
        transform: "scale(1.03)",
      },
    },
  }),

  variants: {
    handle: {
      false: {},
      true: style({
        cursor: "grab",
      }),
    },
  },
});
