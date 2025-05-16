import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const header = recipe({
  base: [
    {
      alignSelf: "stretch",
      flexDirection: "row",
      gap: "12",
      justifyContent: "space-between",
    },
    style({
      minHeight: theme.size.sm,
    }),
  ],
});

export const addon = recipe({
  base: [
    {
      flex: "none",
      flexDirection: "row",
      gap: "8",
    },
  ],

  variants: {
    slot: {
      after: style({
        order: 3,
      }),
      before: style({
        order: 1,
      }),
    },
  },
});

export const content = recipe({
  base: [
    {
      flex: "1",
    },
    style({
      order: 2,
    }),
  ],
});
