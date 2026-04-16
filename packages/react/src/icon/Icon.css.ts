import { theme } from "@optiaxiom/globals";

import {
  createGlobalVar,
  fallbackVar,
  recipe,
  style,
} from "../vanilla-extract";

const iconSizeVar = createGlobalVar("ax-styles-iconSize");

export const icon = recipe({
  base: [
    {
      flex: "none",
      w: "auto",
    },
    style({
      height: fallbackVar(iconSizeVar, theme.size["2xs"]),
    }),
  ],
});
