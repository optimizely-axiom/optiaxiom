import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers, theme } from "../styles";

const unresponsiveProperties = defineProperties({
  "@layer": layers.axiom,
  properties: {
    fontSize: theme.headings.fontSizes,
    lineHeight: theme.headings.lineHeights,
  },
  shorthands: {
    size: ["fontSize", "lineHeight"],
  },
});

export const sprinkles = createSprinkles(unresponsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
