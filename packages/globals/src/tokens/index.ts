import { borderRadius } from "./borderRadius";
import { boxShadow } from "./boxShadow";
import { colors, colorsDark } from "./colors";
import { fontFamily } from "./fontFamily";
import { fontSize } from "./fontSize";
import { maxSize } from "./maxSize";
import { screens } from "./screens";
import { size } from "./size";
import { zIndex } from "./zIndex";

export const tokens = {
  borderRadius,
  boxShadow,
  colors,
  fontFamily,
  fontSize,
  maxSize,
  screens,
  size,
  zIndex,
} as const;

export const tokensDark = {
  colors: colorsDark,
} as const;
