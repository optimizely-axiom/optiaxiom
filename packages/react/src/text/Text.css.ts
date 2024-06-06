import { style, styleVariants } from "../vanilla-extract";

const truncateBase = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
});
const lineClampBase = style([
  truncateBase,
  {
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
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
    whiteSpace: "nowrap",
  },
]);
