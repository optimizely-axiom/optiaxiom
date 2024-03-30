import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const base = style({
  "@layer": {
    [layers.reset]: {
      border: 0,
      boxSizing: "border-box",
      font: "inherit",
      fontSize: "100%",
      margin: 0,
      minWidth: 0,
      padding: 0,
      verticalAlign: "baseline",
    },
  },
});
