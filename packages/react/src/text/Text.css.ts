import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const base = style({
  "@layer": {
    [layers.axiom]: {
      fontFamily: "InterVariable, system-ui, sans-serif",
    },
  },
});
