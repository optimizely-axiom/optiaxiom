import { style } from "@vanilla-extract/css";

import { layers, theme } from "../styles";

export const shadows = {
  xs: style({
    "@layer": {
      [layers.axiom]: {
        boxShadow: `0px 2px 3px ${theme.colors["dark.50"]}`,
      },
    },
  }),
};
