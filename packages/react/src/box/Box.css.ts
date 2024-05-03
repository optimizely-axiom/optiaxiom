import { style } from "@vanilla-extract/css";

import { layers, theme } from "../styles";

export const base = style({
  "@layer": {
    [layers.reset]: {
      border: `0 solid ${theme.color["border"]}`,
      boxSizing: "border-box",
      font: "inherit",
      fontSize: "100%",
      margin: 0,
      minWidth: 0,
      padding: 0,
      selectors: {
        "&:is(button)": {
          background: 0,
        },
        "&:is(ol, ul)": {
          listStyle: "none",
        },
        "&:is(select)": {
          appearance: "none",
        },
      },
      verticalAlign: "baseline",
    },
  },
});
