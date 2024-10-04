import { createSprinklesMerge } from "./createSprinklesMerge";
// eslint-disable-next-line local/prefer-styles-import
import { responsiveProps, unresponsiveProps } from "./properties.css";

export const sprinklesMerge = createSprinklesMerge(
  unresponsiveProps,
  responsiveProps,
);
