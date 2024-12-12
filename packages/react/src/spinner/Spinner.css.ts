import { theme } from "@optiaxiom/globals";

import { recipe, style } from "../vanilla-extract";

export const track = recipe({
  variants: {
    appearance: {
      default: style({
        color: theme.colors["bg.spinner.default"],
      }),
      inverse: style({
        color: theme.colors["bg.spinner.inverse"],
      }),
    },
  },
});
