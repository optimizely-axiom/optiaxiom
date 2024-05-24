import { keyframes } from "@vanilla-extract/css";

import { layers, theme } from "../styles";
import { tokens } from "../tokens";
import { mapValues } from "../utils";
import { createMapValueFn, createSprinkles, defineProperties } from "./lib";

const merge = <A, B>(objA: A, objB: B): A & B => ({ ...objA, ...objB });

const animations = {
  pulse: keyframes({
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.5 },
  }),
};

const margins = merge(theme.margins, { auto: "auto" });

const radiuses = merge(theme.borderRadius, { inherit: "inherit" });

const transitions = {
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
} as const;

const conditions = {
  conditions: {
    ...mapValues(tokens.screens, (width) => ({
      "@media": `screen and (min-width: ${width})`,
    })),
    base: {},
  },
  defaultCondition: "base",
  responsiveArray: ["base", "sm", "xl"],
} as const;

const states = {
  "aria-error": "&[data-error]",
  "data-disabled": "&[data-disabled]",
  "focus-visible": "&:focus-visible",
  hover: "&:hover",
  "hover-enabled": "&:hover:enabled",
} as const;
const modifiers = {
  ...mapValues(
    states,
    (selector) => selector,
    (key) => `:${key}`,
  ),
};

const props = defineProperties({
  "@layer": layers.axiom,
  conditions,
  modifiers,
  propertiesDynamic: {
    backgroundColor: theme.colors,
    borderBottomColor: theme.colors,
    borderBottomLeftRadius: radiuses,
    borderBottomRightRadius: radiuses,
    borderBottomWidth: theme.borderWidth,
    borderLeftColor: theme.colors,
    borderLeftWidth: theme.borderWidth,
    borderRadius: radiuses,
    borderRightColor: theme.colors,
    borderRightWidth: theme.borderWidth,
    borderTopColor: theme.colors,
    borderTopLeftRadius: radiuses,
    borderTopRightRadius: radiuses,
    borderTopWidth: theme.borderWidth,
    boxShadow: theme.boxShadow,
    /**
     * Set the element's text color
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/colors/ Documentation}
     */
    color: theme.colors,
    /**
     * Set the element's font family
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/font-family/ Documentation}
     */
    fontFamily: theme.fontFamily,
    /**
     * Set the element's font size
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/font-size/ Documentation}
     */
    fontSize: merge(theme.fontSize, {
      inherit: {
        fontSize: "inherit",
        lineHeight: "inherit",
      },
    }),
    /**
     * Control the gutter between grid and flexbox items
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/gap/ Documentation}
     */
    gap: theme.spacing,
    height: theme.size,
    letterSpacing: theme.letterSpacing,
    /**
     * Set the element's line height
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/line-height/ Documentation}
     */
    lineHeight: theme.lineHeight,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    maxHeight: theme.maxSize,
    maxWidth: theme.maxSize,
    /**
     * Set the element's outline color
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/outline-color/ Documentation}
     */
    outlineColor: theme.colors,
    /**
     * Set the element's outline offset
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/outline-offset/ Documentation}
     */
    outlineOffset: theme.outlineWidth,
    outlineWidth: merge(
      mapValues(theme.outlineWidth, (outlineWidth) => ({
        outlineStyle: "solid",
        outlineWidth,
      })),
      {
        none: {
          outline: "2px solid transparent",
        },
      },
    ),
    paddingBottom: theme.spacing,
    paddingLeft: theme.spacing,
    paddingRight: theme.spacing,
    paddingTop: theme.spacing,
    /**
     * Set the element's position
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/top-right-bottom-left/ Documentation}
     */
    top: theme.spacing,
    /**
     * Set the element's width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/width/ Documentation}
     */
    width: theme.size,
    zIndex: theme.zIndex,
  },
  propertiesStatic: {
    alignItems: ["center", "end", "normal", "start", "stretch"] as const,
    /**
     * Animate element with CSS animations
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/animation/ Documentation}
     */
    animation: {
      pulse: `${animations.pulse} 2s ease-in-out infinite`,
    },
    /**
     * Set the element's cursor
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/cursor/ Documentation}
     */
    cursor: ["default", "pointer"] as const,
    /**
     * Set the element's display
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/display/ Documentation}
     */
    display: [
      "none",
      "flex",
      "grid",
      "block",
      "inline",
      "inline-block",
      "inline-flex",
      "table",
      "table-cell",
      "table-row",
    ] as const,
    /**
     * Set the element's flex
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/flex/ Documentation}
     */
    flex: {
      "1": "1 1 0%",
      auto: "1 1 auto",
      none: "none",
    },
    /**
     * Set the element's flex direction
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/flex-direction/ Documentation}
     */
    flexDirection: {
      column: "column",
      horizontal: "row",
      row: "row",
      vertical: "column",
    },
    flexGrow: ["1"] as const,
    flexShrink: ["1"] as const,
    /**
     * Set the element's flex wrap
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/flex-wrap/ Documentation}
     */
    flexWrap: {
      wrap: "wrap",
    },
    /**
     * Set the element's font smoothing
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/font-smoothing/ Documentation}
     */
    fontSmoothing: {
      auto: {
        WebkitFontSmoothing: "auto",
      },
    },
    /**
     * Set the element's font style
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/font-style/ Documentation}
     */
    fontStyle: ["normal", "italic"] as const,
    /**
     * Set the element's font weight
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/font-weight/ Documentation}
     */
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
    gridColumn: {
      "1": "span 1 / span 1",
      "2": "span 2 / span 2",
    },
    gridTemplateColumns: mapValues(
      {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
      },
      (cols) => `repeat(${cols}, minmax(0, 1fr))`,
    ),
    /**
     * Set the element's position
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/top-right-bottom-left/ Documentation}
     */
    inset: ["0"] as const,
    /**
     * Set the element's justify content
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/justify-content/ Documentation}
     */
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
    /**
     * Set the element's overflow
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/overflow/ Documentation}
     */
    overflow: ["auto", "hidden", "visible"] as const,
    /**
     * Set the element's place items
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/place-items/ Documentation}
     */
    placeItems: ["center"] as const,
    /**
     * Set the element's pinter events
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/pinter-events/ Documentation}
     */
    pointerEvents: ["none"] as const,
    /**
     * Set the element's position
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/position/ Documentation}
     */
    position: ["absolute", "relative", "static", "sticky"] as const,
    /**
     * Set the element's text align
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/text-align/ Documentation}
     */
    textAlign: ["start", "center", "justify"] as const,
    /**
     * Set the element's text decoration
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/text-decoration/ Documentation}
     */
    textDecoration: ["none", "underline"] as const,
    /**
     * Set the element's text transform
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/text-transform/ Documentation}
     */
    textTransform: ["capitalize", "none", "uppercase"] as const,
    /**
     * Control which CSS properties should transition
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/transition/ Documentation}
     */
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
    /**
     * Set the element's white space
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/white-space/ Documentation}
     */
    whiteSpace: ["nowrap"] as const,
  },
  shorthands: {
    /**
     * Set the element's background color
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/docs/colors/ Documentation}
     */
    bg: ["backgroundColor"],
    /**
     * Set the element's border width on all sides
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    border: [
      "borderBottomWidth",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
    ],
    /**
     * Set the element's bottom border width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderB: ["borderBottomWidth"],
    /**
     * Set the element's border color on all sides
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderColor: [
      "borderBottomColor",
      "borderLeftColor",
      "borderRightColor",
      "borderTopColor",
    ],
    /**
     * Set the element's left border width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderL: ["borderLeftWidth"],
    /**
     * Set the element's right border width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderR: ["borderRightWidth"],
    /**
     * Set the element's top border width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderT: ["borderTopWidth"],
    /**
     * Set the element's size across grid columns
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/grid-column/ Documentation}
     */
    colSpan: ["gridColumn"],
    /**
     * Control number of columns in a grid layout
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/grid-tenmplate-columns/ Documentation}
     */
    cols: ["gridTemplateColumns"],
    grow: ["flexGrow"],
    /**
     * Set the element's height
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/height/ Documentation}
     */
    h: ["height"],
    /**
     * Set the element's line height
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/line-height/ Documentation}
     */
    leading: ["lineHeight"],
    /**
     * Set the element's margin on all sides
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/margin/ Documentation}
     */
    m: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
    /**
     * Set the element's max-height
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/max-size/ Documentation}
     */
    maxH: ["maxHeight"],
    /**
     * Set the element's max-width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/max-size/ Documentation}
     */
    maxW: ["maxWidth"],
    /**
     * Set the element's bottom margin
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/margin/ Documentation}
     */
    mb: ["marginBottom"],
    /**
     * Set the element's left margin
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/margin/ Documentation}
     */
    ml: ["marginLeft"],
    /**
     * Set the element's right margin
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/margin/ Documentation}
     */
    mr: ["marginRight"],
    /**
     * Set the element's top margin
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/margin/ Documentation}
     */
    mt: ["marginTop"],
    /**
     * Set the element's left and right margin
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/margin/ Documentation}
     */
    mx: ["marginLeft", "marginRight"],
    /**
     * Set the element's top and bottom margin
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/margin/ Documentation}
     */
    my: ["marginBottom", "marginTop"],
    /**
     * Set the element's outline width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/outline-width/ Documentation}
     */
    outline: ["outlineWidth"],
    /**
     * Set the element's padding on all sides
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/padding/ Documentation}
     */
    p: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
    /**
     * Set the element's bottom padding
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/padding/ Documentation}
     */
    pb: ["paddingBottom"],
    /**
     * Set the element's left padding
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/padding/ Documentation}
     */
    pl: ["paddingLeft"],
    /**
     * Set the element's right padding
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/padding/ Documentation}
     */
    pr: ["paddingRight"],
    /**
     * Set the element's top padding
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/padding/ Documentation}
     */
    pt: ["paddingTop"],
    /**
     * Set the element's left and right padding
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/padding/ Documentation}
     */
    px: ["paddingLeft", "paddingRight"],
    /**
     * Set the element's top and bottom padding
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/padding/ Documentation}
     */
    py: ["paddingBottom", "paddingTop"],
    /**
     * Set the element's border radius on all corners
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    rounded: ["borderRadius"],
    /**
     * Set the element's bottom side border radius
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    roundedB: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    /**
     * Set the element's bottom left corner border radius
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    roundedBL: ["borderBottomLeftRadius"],
    /**
     * Set the element's bottom right corner border radius
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    roundedBR: ["borderBottomRightRadius"],
    /**
     * Set the element's left side border radius
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    roundedL: ["borderBottomLeftRadius", "borderTopLeftRadius"],
    /**
     * Set the element's right side border radius
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    roundedR: ["borderBottomRightRadius", "borderTopRightRadius"],
    /**
     * Set the element's top side border radius
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    roundedT: ["borderTopLeftRadius", "borderTopRightRadius"],
    /**
     * Set the element's top left corner border radius
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    roundedTL: ["borderTopLeftRadius"],
    /**
     * Set the element's top right corder border radius
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    roundedTR: ["borderTopRightRadius"],
    /**
     * Set the element's box shadow
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/box-shadow/ Documentation}
     */
    shadow: ["boxShadow"],
    shrink: ["flexShrink"],
    /**
     * Set the element's width and height
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/size/ Documentation}
     */
    size: ["height", "width"],
    /**
     * Set the element's letter spacing
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/letter-spacing/ Documentation}
     */
    tracking: ["letterSpacing"],
    /**
     * Set the element's width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/width/ Documentation}
     */
    w: ["width"],
    /**
     * Set the element's stack order
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/z-index/ Documentation}
     */
    z: ["zIndex"],
  },
});

export const sprinkles = createSprinkles(props);
export const mapResponsiveValue = createMapValueFn(props);

type LonghandProps = keyof Pick<
  Parameters<typeof sprinkles>[0],
  | "backgroundColor"
  | "borderBottomLeftRadius"
  | "borderBottomRightRadius"
  | "borderBottomWidth"
  | "borderLeftWidth"
  | "borderRadius"
  | "borderRightWidth"
  | "borderTopLeftRadius"
  | "borderTopRightRadius"
  | "borderTopWidth"
  | "boxShadow"
  | "flexGrow"
  | "flexShrink"
  | "gridColumn"
  | "gridTemplateColumns"
  | "height"
  | "letterSpacing"
  | "lineHeight"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "maxHeight"
  | "maxWidth"
  | "outlineWidth"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "width"
  | "zIndex"
>;
export type Sprinkles = Omit<Parameters<typeof sprinkles>[0], LonghandProps>;
