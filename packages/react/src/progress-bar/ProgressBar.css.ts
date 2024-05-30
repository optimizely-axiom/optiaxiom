import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const base = style({
  "@layer": {
    [layers.axiom]: {
      fontSize: "0.875em",
    },
  },
});

export const progressBar = style({
  "@layer": {
    [layers.axiom]: {
      backgroundColor: "white",
      border: "1px solid #ccc",
      height: "5px",
      overflow: "hidden",
      position: "relative",
      width: "300px",
    },
  },
});

export const progressIndicator = style({
  "@layer": {
    [layers.axiom]: {
      backgroundColor: "#7C3AED",
      borderRadius: "2px",
      boxSizing: "border-box",
      height: "100%",
      transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
    },
  },
});
