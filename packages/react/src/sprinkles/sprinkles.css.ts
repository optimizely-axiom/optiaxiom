import { createVar, keyframes } from "@vanilla-extract/css";
import {
  createMapValueFn,
  createSprinkles,
  defineProperties,
} from "@vanilla-extract/sprinkles";

import { layers, theme, tokens } from "../styles";
import { mapValues } from "../utils";

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

const transitions = {
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
} as const;

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
        letterSpacing: theme.letterSpacing,
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
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/sizing/#height} */
        h: ["height"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#multiple-sides} */
        m: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#single-side} */
        mb: ["marginBottom"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#single-side} */
        ml: ["marginLeft"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#single-side} */
        mr: ["marginRight"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#single-side} */
        mt: ["marginTop"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#multiple-sides} */
        mx: ["marginLeft", "marginRight"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#multiple-sides} */
        my: ["marginBottom", "marginTop"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#multiple-sides-1} */
        p: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#single-side-1} */
        pb: ["paddingBottom"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#single-side-1} */
        pl: ["paddingLeft"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#single-side-1} */
        pr: ["paddingRight"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#single-side-1} */
        pt: ["paddingTop"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#multiple-sides-1} */
        px: ["paddingLeft", "paddingRight"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/spacing/#multiple-sides-1} */
        py: ["paddingBottom", "paddingTop"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/sizing/#size} */
        size: ["height", "width"],
        tracking: ["letterSpacing"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/sizing/#width} */
        w: ["width"],
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
        cursor: ["default", "pointer"] as const,
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
        inset: ["0"] as const,
        overflow: ["auto", "hidden", "visible"] as const,
        pointerEvents: ["none"] as const,
        position: ["absolute", "relative", "static", "sticky"] as const,
        textTransform: ["capitalize", "none", "uppercase"] as const,
        transition: {
          all: {
            ...transitions,
            transitionProperty: "all",
          },
          colors: {
            ...transitions,
            transitionProperty:
              "background-color, border-color, color, fill, stroke, text-decoration-color",
          },
        },
        whiteSpace: ["nowrap"] as const,
        zIndex: theme.zIndex,
      },
      shorthands: {
        border: [
          "borderBottomWidth",
          "borderLeftWidth",
          "borderRightWidth",
          "borderTopWidth",
        ],
        borderBottom: ["borderBottomWidth"],
        borderLeft: ["borderLeftWidth"],
        borderRight: ["borderRightWidth"],
        borderTop: ["borderTopWidth"],
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/border-radius/} */
        rounded: ["borderRadius"],
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
        fontSize: merge(theme.fontSize, { inherit: "inherit" }),
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
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/colors/} */
        color: theme.color,
        textDecoration: ["none", "underline"] as const,
      },
      shorthands: {
        /** {@link https://optimizely-axiom.github.io/optiaxiom/docs/colors/} */
        bg: ["background"],
        shadow: ["boxShadow"],
      },
    }),
  ] as const;

const modifiers = {
  focus: "&:focus",
  hover: "&:hover",
} as const;

const props = {
  base: [...createBaseProperties(), ...createModifierProperties()] as const,
  selectors: mapValues(modifiers, (selector) =>
    createModifierProperties(selector),
  ),
} as const;

export const sx = {
  base: createSprinkles(...props.base),
  selectors: mapValues(
    props.selectors,
    (properties) => createSprinkles(...properties),
    (key) => `:${key}`,
  ),
} as const;

type LonghandProps =
  | "background"
  | "borderBottomWidth"
  | "borderLeftWidth"
  | "borderRadius"
  | "borderRightWidth"
  | "borderTopWidth"
  | "boxShadow"
  | "height"
  | "letterSpacing"
  | "margin"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "marginX"
  | "marginY"
  | "padding"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingX"
  | "paddingY"
  | "width";
export type SprinklesBase = Omit<Parameters<typeof sx.base>[0], LonghandProps>;
export type SprinklesSelectors = {
  [Key in keyof typeof sx.selectors]: Omit<
    Parameters<(typeof sx.selectors)[Key]>[0],
    LonghandProps
  >;
};

export const mapResponsiveValue = createMapValueFn(props.base[0]);
