import { borderRadius } from "./borderRadius";
import { borderWidth } from "./borderWidth";
import { boxShadow } from "./boxShadow";
import { colors, colorsDark } from "./colors";
import { fontFamily } from "./fontFamily";
import { fontSize } from "./fontSize";
import { margins } from "./margins";
import { maxSize } from "./maxSize";
import { screens } from "./screens";
import { size } from "./size";
import { spacing } from "./spacing";
import { zIndex } from "./zIndex";

export const tokens = {
  borderRadius,
  borderWidth,
  boxShadow,
  colors,
  fontFamily,
  fontSize,
  margins,
  maxSize,
  screens,
  size,
  spacing,
  zIndex,
} as const;

export const tokensDark = {
  ...tokens,
  colors: colorsDark,
} as const;
