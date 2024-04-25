import { keyframes, style } from "@vanilla-extract/css";
import {
  createMapValueFn,
  createSprinkles,
  defineProperties,
} from "@vanilla-extract/sprinkles";

import { layers, theme, tokens } from "../styles";
import { mapValues } from "../utils";

export const base = style({
  "@layer": {
    [layers.reset]: {
      border: `0 solid ${theme.color["border"]}`,
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
    alignItems: ["center", "end", "normal", "start", "stretch"] as const,
    colSpan: {
      1: { gridColumn: "span 1 / span 1" },
      2: { gridColumn: "span 2 / span 2" },
    },
    display: [
      "none",
      "flex",
      "grid",
      "block",
      "inline",
      "inline-flex",
      "table-cell",
    ] as const,
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      none: "none",
    },
    flexDirection: {
      column: "column",
      horizontal: "row",
      row: "row",
      vertical: "column",
    },
    flexWrap: {
      wrap: "wrap",
    },
    gap: theme.space,
    grow: {
      1: { flexGrow: 1 },
    },
    justifyContent: [
      "center",
      "end",
      "normal",
      "space-around",
      "space-between",
      "space-evenly",
      "start",
      "stretch",
    ] as const,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    maxWidth: theme.maxWidth,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    paddingRight: theme.space,
    paddingTop: theme.space,
    placeItems: ["center"] as const,
    shrink: {
      1: { flexShrink: 1 },
    },
  },
  responsiveArray: ["base", "sm", "xl"],
  shorthands: {
    /**
     * An alias for `flexDirection`
     */
    direction: ["flexDirection"],
    /**
     * An alias for `alignItems`
     */
    items: ["alignItems"],
    /**
     * An alias for `justifyContent`
     */
    justify: ["justifyContent"],
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
  },
  defaultCondition: "base",
  properties: {
    background: theme.color,
    color: theme.color,
  },
});

const animations = {
  pulse: keyframes({
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.5 },
  }),
};

const unresponsiveProperties = defineProperties({
  "@layer": layers.axiom,
  properties: {
    animation: {
      pulse: `${animations.pulse} 2s ease-in-out infinite`,
    },
    borderBottomColor: theme.color,
    borderBottomWidth: theme.borderWidth,
    borderLeftWidth: theme.borderWidth,
    borderRadius: {
      ...theme.radius,
      inherit: "inherit",
    },
    borderRightWidth: theme.borderWidth,
    borderTopWidth: theme.borderWidth,
    height: theme.size,
    overflow: ["auto", "hidden", "visible"] as const,
    width: theme.size,
  },
  shorthands: {
    borderWidth: [
      "borderBottomWidth",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
    ],
    size: ["height", "width"],
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  unresponsiveProperties,
);
export const mapResponsiveValue = createMapValueFn(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
