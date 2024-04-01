import { style } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers, theme, tokens } from "../styles";

export const base = style({
  "@layer": {
    [layers.reset]: {
      border: 0,
      boxSizing: "border-box",
      font: "inherit",
      fontSize: "100%",
      margin: 0,
      minWidth: 0,
      padding: 0,
      verticalAlign: "baseline",
    },
  },
});

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
  "@layer": layers.axiom,
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
    display: ["none", "flex", "grid", "block", "inline", "inline-flex"],
    flexDirection: ["row", "column"],
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
  },
  shorthands: {
    marginX: ["marginBottom", "marginTop"],
    paddingX: ["paddingBottom", "paddingTop"],
  },
});

const colorProperties = defineProperties({
  "@layer": layers.axiom,
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

const unresponsiveProperties = defineProperties({
  "@layer": layers.axiom,
  properties: {
    borderRadius: theme.radius,
    fontSize: theme.fontSizes,
    fontWeight: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    lineHeight: theme.lineHeights,
    textAlign: ["start", "center", "justify"],
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  unresponsiveProperties,
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
