import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers, theme } from "../styles";

const unresponsiveProperties = defineProperties({
  "@layer": layers.axiom,
  properties: {
    fontFamily: {
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
      sans: "InterVariable, system-ui, sans-serif",
    },
    fontSize: theme.fontSize,
    fontStyle: ["normal", "italic"] as const,
    fontWeight: [100, 200, 300, 400, 500, 600, 700, 800, 900] as const,
    lineHeight: theme.lineHeight,
    textAlign: ["start", "center", "justify"] as const,
    textDecoration: ["none", "underline"] as const,
    textTransform: ["capitalize", "none", "uppercase"] as const,
  },
  shorthands: {
    size: ["fontSize", "lineHeight"],
  },
});

export const sprinkles = createSprinkles(unresponsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
