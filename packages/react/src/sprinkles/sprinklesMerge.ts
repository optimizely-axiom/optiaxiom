import { createSprinklesMerge } from "./createSprinklesMerge";
// eslint-disable-next-line local/prefer-styles-import
import { responsiveProps, unresponsiveProps } from "./properties.css";
import { sprinkles } from "./sprinkles";

export const sprinklesMerge = createSprinklesMerge(
  sprinkles,
  unresponsiveProps,
  responsiveProps,
);
