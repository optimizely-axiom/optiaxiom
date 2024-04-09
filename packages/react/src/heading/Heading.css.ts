import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers, theme } from "../styles";

const unresponsiveProperties = defineProperties({
  "@layer": layers.axiom,
  properties: {
    fontSize: theme.heading.fontSize,
    lineHeight: theme.heading.lineHeight,
  },
  shorthands: {
    size: ["fontSize", "lineHeight"],
  },
});

export const sprinkles = createSprinkles(unresponsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
