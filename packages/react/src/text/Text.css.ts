import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const truncate = style({
  "@layer": {
    [layers.axiom]: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
});
