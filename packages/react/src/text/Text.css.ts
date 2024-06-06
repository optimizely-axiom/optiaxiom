import { style, styleVariants } from "@vanilla-extract/css";

import { layers } from "../styles";

const truncateBase = style({
  "@layer": {
    [layers.axiom]: {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});
const lineClampBase = style([
  truncateBase,
  {
    "@layer": {
      [layers.axiom]: {
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
      },
    },
  },
]);

export const lineClamp = styleVariants(
  {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
  } as const,
  (WebkitLineClamp) => [lineClampBase, { WebkitLineClamp }],
);

export const truncate = style([
  truncateBase,
  {
    "@layer": {
      [layers.axiom]: {
        whiteSpace: "nowrap",
      },
    },
  },
]);
