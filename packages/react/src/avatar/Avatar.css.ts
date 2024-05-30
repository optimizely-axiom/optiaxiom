import { style } from "@vanilla-extract/css";

import { layers } from "../styles";
export const base = style({
  "@layer": {
    [layers.axiom]: {
      alignItems: "center",
      borderRadius: "100%",
      display: "inline-flex",
      justifyContent: "center",
      overflow: "hidden",
      userSelect: "none",
    },
  },
});

export const fallback = style({
  "@layer": {
    [layers.axiom]: {
      alignItems: "center",
      borderRadius: "50%",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      width: "100%",
    },
  },
});

export const image = style({
  "@layer": {
    [layers.axiom]: {
      borderRadius: "inherit",
      height: "100%",
      objectFit: "cover",
      width: "100%",
    },
  },
});
