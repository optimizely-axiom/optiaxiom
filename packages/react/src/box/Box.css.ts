import { style } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers, theme, tokens } from "../styles";
import { mapValues } from "../utils";

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
    display: ["none", "flex", "grid", "block", "inline", "inline-flex"],
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    paddingBottom: theme.spacing,
    paddingLeft: theme.spacing,
    paddingRight: theme.spacing,
    paddingTop: theme.spacing,
  },
  shorthands: {
    margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
    marginX: ["marginBottom", "marginTop"],
    marginY: ["marginLeft", "marginRight"],
    padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
    paddingX: ["paddingBottom", "paddingTop"],
    paddingY: ["paddingLeft", "paddingRight"],
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
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  unresponsiveProperties,
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
