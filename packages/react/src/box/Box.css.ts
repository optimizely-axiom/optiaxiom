import { createVar, keyframes, style } from "@vanilla-extract/css";
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

const merge = <A, B>(objA: A, objB: B): A & B => ({ ...objA, ...objB });

const animations = {
  pulse: keyframes({
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.5 },
  }),
};

const cols = createVar();

const margins = merge(
  merge(
    theme.space,
    mapValues(
      theme.space,
      (v) => `calc(-1 * ${v})`,
      (k) => `-${k}`,
    ),
  ),
  { auto: "auto" },
);

const createBaseProperties = (selector?: string) =>
  [
    defineProperties({
      "@layer": layers.axiom,
      conditions: {
        ...mapValues(tokens.breakpoint, (width) => ({
          "@media": `screen and (min-width: ${width})`,
          ...{ selector },
        })),
        base: { selector },
      },
      defaultCondition: "base",
      properties: {
        alignItems: ["center", "end", "normal", "start", "stretch"] as const,
        colSpan: {
          "1": { gridColumn: "span 1 / span 1" },
          "2": { gridColumn: "span 2 / span 2" },
        },
        cols: {
          "1": { vars: { [cols]: 1 } },
          "2": { vars: { [cols]: 2 } },
          "3": { vars: { [cols]: 3 } },
          "4": { vars: { [cols]: 4 } },
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
          "1": "1 1 0%",
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
          "1": { flexGrow: 1 },
        },
        height: theme.size,
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
          "1": { flexShrink: 1 },
        },
        textAlign: ["start", "center", "justify"] as const,
        width: theme.size,
      },
      responsiveArray: ["base", "sm", "xl"],
      shorthands: {
        margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
        marginX: ["marginLeft", "marginRight"],
        marginY: ["marginBottom", "marginTop"],
        padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
        paddingX: ["paddingLeft", "paddingRight"],
        paddingY: ["paddingBottom", "paddingTop"],
        size: ["height", "width"],
      },
    }),
    defineProperties({
      "@layer": layers.axiom,
      conditions: {
        base: { selector },
      },
      defaultCondition: "base",
      properties: {
        animation: {
          pulse: `${animations.pulse} 2s ease-in-out infinite`,
        },
        borderBottomWidth: theme.borderWidth,
        borderLeftWidth: theme.borderWidth,
        borderRadius: merge(theme.radius, { inherit: "inherit" }),
        borderRightWidth: theme.borderWidth,
        borderTopWidth: theme.borderWidth,
        fontFamily: {
          mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
          sans: "InterVariable, system-ui, sans-serif",
        },
        fontStyle: ["normal", "italic"] as const,
        fontWeight: [
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ] as const,
        gridTemplateColumns: {
          cols: {
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          },
        },
        overflow: ["auto", "hidden", "visible"] as const,
        textTransform: ["capitalize", "none", "uppercase"] as const,
        whiteSpace: ["nowrap"] as const,
      },
      shorthands: {
        borderWidth: [
          "borderBottomWidth",
          "borderLeftWidth",
          "borderRightWidth",
          "borderTopWidth",
        ],
      },
    }),
  ] as const;

const createModifierProperties = (selector?: string) =>
  [
    defineProperties({
      "@layer": layers.axiom,
      conditions: {
        ...mapValues(tokens.breakpoint, (width) => ({
          "@media": `screen and (min-width: ${width})`,
          ...{ selector },
        })),
        base: { selector },
      },
      defaultCondition: "base",
      properties: {
        fontSize: theme.fontSize,
      },
      responsiveArray: ["base", "sm", "xl"],
    }),
    defineProperties({
      "@layer": layers.axiom,
      conditions: {
        base: { selector },
      },
      defaultCondition: "base",
      properties: {
        background: theme.color,
        borderBottomColor: theme.color,
        boxShadow: theme.shadow,
        color: theme.color,
        textDecoration: ["none", "underline"] as const,
      },
    }),
  ] as const;

const modifiers = {
  sxFocus: "&:focus",
  sxHover: "&:hover",
} as const;

const props = {
  base: [...createBaseProperties(), ...createModifierProperties()] as const,
  selectors: mapValues(modifiers, (selector) =>
    createModifierProperties(selector),
  ),
} as const;

export const sprinkles = {
  base: createSprinkles(...props.base),
  selectors: mapValues(
    props.selectors,
    (properties) => createSprinkles(...properties),
    (key) => key,
  ),
} as const;

export type SprinklesBase = Parameters<typeof sprinkles.base>[0];
export type SprinklesSelectors = {
  [Key in keyof typeof sprinkles.selectors]: Parameters<
    (typeof sprinkles.selectors)[Key]
  >[0];
};

export const mapResponsiveValue = createMapValueFn(props.base[0]);
