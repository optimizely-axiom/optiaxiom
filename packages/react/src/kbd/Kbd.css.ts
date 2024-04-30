import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const keys = style({
  "@layer": {
    [layers.axiom]: {
      fontSize: "1.2em",
      lineHeight: "1",
    },
  },
});
