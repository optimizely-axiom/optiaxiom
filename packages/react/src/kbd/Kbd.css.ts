import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const base = style({
  "@layer": {
    [layers.axiom]: {
      borderBottomWidth: "2px",
    },
  },
});

export const keys = style({
  "@layer": {
    [layers.axiom]: {
      fontSize: "1.2em",
      lineHeight: "1",
      textDecoration: "none",
    },
  },
});
