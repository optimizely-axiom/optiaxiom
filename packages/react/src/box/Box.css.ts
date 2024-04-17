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
      selectors: {
        "&:is(button)": {
          background: 0,
        },
        "&:is(ol, ul)": {
          listStyle: "none",
        },
        "&:is(select)": {
          appearance: "none",
        },
      },
      verticalAlign: "baseline",
    },
  },
});

const margins = {
  ...theme.space,
  ...mapValues(
    theme.space,
    (v) => `calc(-1 * ${v})`,
    (k) => `-${k}`,
  ),
  auto: "auto",
};

const responsiveProperties = defineProperties({
  "@layer": layers.axiom,
  conditions: {
    ...mapValues(tokens.breakpoint, (width) => ({
      "@media": `screen and (min-width: ${width})`,
    })),
    base: {},
  },
  defaultCondition: "base",
  properties: {
    display: [
      "none",
      "flex",
      "grid",
      "block",
      "inline",
      "inline-flex",
    ] as const,
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      none: "none",
    },
    grow: {
      1: { flexGrow: 1 },
    },
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    maxWidth: theme.maxWidth,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    paddingRight: theme.space,
    paddingTop: theme.space,
    shrink: {
      1: { flexShrink: 1 },
    },
  },
  shorthands: {
    margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginBottom", "marginTop"],
    padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingBottom", "paddingTop"],
  },
});

const colorProperties = defineProperties({
  "@layer": layers.axiom,
  conditions: {
    base: {},
    dark: { selector: "&:is(.dark *)" },
  },
  defaultCondition: "base",
  properties: {
    background: theme.color,
    color: theme.color,
  },
});

const unresponsiveProperties = defineProperties({
  "@layer": layers.axiom,
  properties: {
    borderRadius: theme.radius,
    overflow: ["auto", "hidden", "visible"] as const,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  unresponsiveProperties,
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
