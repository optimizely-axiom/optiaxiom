import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { axiom } from "./layers.css";
import { theme } from "./theme.css";
import { tokens } from "./tokens";

function mapValues<V, K extends KResult, VResult, KResult extends PropertyKey>(
  obj: Record<K, V>,
  valueFn: (value: V) => VResult,
  keyFn: (key: K) => KResult = (key) => key,
) {
  const result = {} as Record<KResult, VResult>;
  for (const [key, value] of Object.entries<V>(obj)) {
    result[keyFn ? keyFn(key as K) : (key as K)] = valueFn(value);
  }
  return result;
}

const margins = {
  ...theme.spacing,
  ...mapValues(
    theme.spacing,
    (v) => `calc(-1 * ${v})`,
    (k) => `-${k}`,
  ),
  auto: "auto",
};

const responsiveProperties = defineProperties({
  "@layer": axiom,
  conditions: {
    ...mapValues(tokens.breakpoints, (width) => ({
      "@media": `screen and (min-width: ${width})`,
    })),
    base: {},
  },
  defaultCondition: "base",
  properties: {
    alignItems: [
      "center",
      "end",
      "normal",
      "space-around",
      "space-between",
      "space-evenly",
      "start",
      "stretch",
    ],
    borderRadius: theme.radius,
    display: ["none", "flex", "grid", "block", "inline", "inline-flex"],
    flexDirection: ["row", "column"],
    fontSize: theme.fontSizes,
    fontWeight: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    gap: theme.spacing,
    justifyContent: [
      "center",
      "end",
      "normal",
      "space-around",
      "space-between",
      "space-evenly",
      "start",
      "stretch",
    ],
    lineHeight: theme.lineHeights,
    margin: margins,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    padding: theme.spacing,
    paddingBottom: theme.spacing,
    paddingLeft: theme.spacing,
    paddingRight: theme.spacing,
    paddingTop: theme.spacing,
    textAlign: ["start", "center", "justify"],
  },
  shorthands: {
    marginX: ["marginBottom", "marginTop"],
    paddingX: ["paddingBottom", "paddingTop"],
  },
});

const colorProperties = defineProperties({
  "@layer": axiom,
  conditions: {
    dark: { selector: "html[class~=dark] &" },
    light: {},
  },
  defaultCondition: "light",
  properties: {
    background: theme.colors,
    color: theme.colors,
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
