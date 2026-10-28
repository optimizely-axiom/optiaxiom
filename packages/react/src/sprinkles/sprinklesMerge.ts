import { createSprinklesMerge } from "./createSprinklesMerge";
// eslint-disable-next-line local/prefer-styles-import
import { responsiveProps, unresponsiveProps } from "./properties.css";
import { responsiveSpacingProps } from "./responsiveSpacing";

export const sprinklesMerge = createSprinklesMerge(
  unresponsiveProps,
  responsiveSpacingProps,
  responsiveProps,
);
