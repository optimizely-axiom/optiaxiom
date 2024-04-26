import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const base = style({
  "@layer": {
    [layers.axiom]: {
      fontSize: "0.875em",
    },
  },
});
