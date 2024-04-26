import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers, theme } from "../styles";

const unresponsiveProperties = defineProperties({
  "@layer": layers.axiom,
  properties: {
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
  },
  shorthands: {
    /**
     * Set both `fontSize` and `lineHeight`
     */
    size: ["fontSize", "lineHeight"],
  },
});

export const sprinkles = createSprinkles(unresponsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
