import { style } from "@vanilla-extract/css";

import { layers } from "../styles";

export const base = style({
  "@layer": {
    [layers.axiom]: {
      selectors: {
        "&:empty:before": { content: '"\\00a0"' },
      },
    },
  },
});
