import { theme } from "@optiaxiom/globals";

import { createVar, getVarName, recipe, style } from "../vanilla-extract";

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

const fillVar = createVar({
  inherits: false,
  initialValue: "0%",
  syntax: "<percentage>",
});

export const path = recipe({
  base: style({
    transition: `${getVarName(fillVar)} ${theme.duration.md}`,
  }),

  variants: {
    filled: {
      false: style({
        vars: {
          [fillVar]: "0%",
        },
      }),
      true: style({
        vars: {
          [fillVar]: "100%",
        },
      }),
    },
    type: {
      filled: style({
        mask: `linear-gradient(225deg, black ${fillVar}, transparent ${fillVar})`,
      }),
      unfilled: style({
        mask: `linear-gradient(225deg, transparent ${fillVar}, black ${fillVar})`,
      }),
    },
  },
});
