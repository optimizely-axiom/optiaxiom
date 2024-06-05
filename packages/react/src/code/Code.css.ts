import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const base = style({
  "@layer": {
    [layers.axiom]: {
      WebkitFontSmoothing: "auto",
      fontSize: "0.875em",
    },
  },
});
