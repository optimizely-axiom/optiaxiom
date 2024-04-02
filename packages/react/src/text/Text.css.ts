import { style } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers, theme } from "../styles";

export const base = style({
  "@layer": {
    [layers.axiom]: {
      fontFamily: "InterVariable, system-ui, sans-serif",
    },
  },
});

const unresponsiveProperties = defineProperties({
  "@layer": layers.axiom,
  properties: {
    fontSize: theme.fontSizes,
    fontStyle: ["normal", "italic"],
    fontWeight: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    lineHeight: theme.lineHeights,
    textAlign: ["start", "center", "justify"],
    textDecoration: ["none", "underline"],
    textTransform: ["capitalize", "none", "uppercase"],
  },
  shorthands: {
    size: ["fontSize", "lineHeight"],
  },
});

export const sprinkles = createSprinkles(unresponsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
