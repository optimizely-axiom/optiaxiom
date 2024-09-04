import {
  createMapValueFn,
  createSprinkles,
  defineProperties,
} from "@vanilla-extract/sprinkles";

import { layers, theme } from "../styles";
import { conditions, mapValues } from "../utils";
import { keyframes } from "../vanilla-extract";

const merge = <A, B>(objA: A, objB: B): A & B => ({ ...objA, ...objB });

const animations = {
  ping: keyframes({
    "75%, 100%": { opacity: 0, scale: 2 },
  }),
  pulse: keyframes({
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.5 },
  }),
  spin: keyframes({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  }),
};

const margins = merge(theme.margins, { auto: "auto" });

const radiuses = merge(theme.borderRadius, { inherit: "inherit" });

const transitions = {
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
} as const;

const unresponsiveProps = defineProperties({
  "@layer": layers.axiom,
  properties: {
    /**
     * Animate element with CSS animations
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/animation/ Documentation}
     */
    animation: {
      ping: `${animations.ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
      pulse: `${animations.pulse} 2s ease-in-out infinite`,
      spin: `${animations.spin} 1s linear infinite`,
    },
    backgroundColor: theme.colors,
    borderBottomWidth: theme.borderWidth,
    /**
     * Set the element's `border-color` CSS property
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-color/ Documentation}
     */
    borderColor: theme.colors,
    borderLeftWidth: theme.borderWidth,
    borderRadius: radiuses,
    borderRightWidth: theme.borderWidth,
    borderTopWidth: theme.borderWidth,
    boxShadow: theme.boxShadow,
    /**
     * Set the element's text color
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/colors/ Documentation}
     */
    color: theme.colors,
    /**
     * Set the element's `cursor` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor Documentation}
     */
    cursor: ["pointer", "default", "text"] as const,
    /**
     * Toggle element visibility based on :empty pseudo-class
     */
    empty: {
      hidden: {
        selectors: {
          "&:empty": {
            display: "none",
          },
        },
      },
    },
    /**
     * Set the element's font family
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/font-family/ Documentation}
     */
    fontFamily: theme.fontFamily,
    /**
     * Set the element's `font-weight` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight Documentation}
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
    letterSpacing: theme.letterSpacing,
    /**
     * Set the element's `object-fit` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit Documentation}
     */
    objectFit: ["contain", "cover", "fill", "none", "scale-down"] as const,
    /**
     * Set the element's `overflow-x` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x Documentation}
     */
    overflowX: ["auto", "hidden", "visible"] as const,
    /**
     * Set the element's `overflow-y` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y Documentation}
     */
    overflowY: ["auto", "hidden", "visible"] as const,
    /**
     * Set the element's `text-align` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-align Documentation}
     */
    textAlign: ["end", "start", "center", "justify"] as const,
    /**
     * Set the element's `text-transform` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform Documentation}
     */
    textTransform: ["capitalize", "none", "uppercase"] as const,
    /**
     * Control which CSS properties should transition
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/transition-property/ Documentation}
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
      opacity: {
        ...transitions,
        transitionProperty: "opacity",
      },
      transform: {
        ...transitions,
        transitionProperty: "transform",
      },
    },
    /**
     * Set the element's `white-space` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/white-space Documentation}
     */
    whiteSpace: ["nowrap"] as const,
    /**
     * Set the element's z-index
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/z-index/ Documentation}
     */
    zIndex: theme.zIndex,
  },
  shorthands: {
    /**
     * Set the element's background color
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/background-color/ Documentation}
     */
    bg: ["backgroundColor"],
    /**
     * Set the element's `border-width` CSS property
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
     * Set the element's `border-bottom-width` CSS property
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderB: ["borderBottomWidth"],
    /**
     * Set the element's `border-left-width` CSS property
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderL: ["borderLeftWidth"],
    /**
     * Set the element's `border-right-width` CSS property
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderR: ["borderRightWidth"],
    /**
     * Set the element's `border-top-width` CSS property
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-width/ Documentation}
     */
    borderT: ["borderTopWidth"],
    /**
     * Set the element's `overflow` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow Documentation}
     */
    overflow: ["overflowX", "overflowY"],
    /**
     * Set the element's border radius on all corners
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/border-radius/ Documentation}
     */
    rounded: ["borderRadius"],
    /**
     * Set the element's box shadow
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/box-shadow/ Documentation}
     */
    shadow: ["boxShadow"],
    /**
     * Set the element's letter spacing
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/letter-spacing/ Documentation}
     */
    tracking: ["letterSpacing"],
    /**
     * Set the element's stack order
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/z-index/ Documentation}
     */
    z: ["zIndex"],
  },
});

const responsiveProps = defineProperties({
  "@layer": layers.axiom,
  ...conditions,
  properties: {
    /**
     * Set the element's `align-items` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-items Documentation}
     */
    alignItems: ["center", "end", "normal", "start", "stretch"] as const,
    /**
     * Set the element's `align-self` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-self Documentation}
     */
    alignSelf: ["center", "end", "normal", "start", "stretch"] as const,
    /**
     * Set the element's `display` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display Documentation}
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
     * Set the element's `flex` CSS property
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/flex/ Documentation}
     */
    flex: {
      "1": "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
    },
    /**
     * Set the element's `flex-direction` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction Documentation}
     */
    flexDirection: ["column", "column-reverse", "row", "row-reverse"] as const,
    /**
     * Set the element's `flex-wrap` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap Documentation}
     */
    flexWrap: ["nowrap", "wrap"] as const,
    /**
     * Set the element's `font-size` and `line-height` CSS properties
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
     * Set the element's `gap` CSS property
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/gap/ Documentation}
     */
    gap: theme.spacing,
    /**
     * Set the element's size across grid columns
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/components/grid/ Documentation}
     */
    gridColumn: mapValues(
      {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
      },
      (span) => `span ${span} / span ${span}`,
    ),
    /**
     * Control number of columns in a grid layout
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/components/grid/ Documentation}
     */
    gridTemplateColumns: mapValues(
      {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
      },
      (cols) => `repeat(${cols}, minmax(0, 1fr))`,
    ),
    height: theme.size,
    /**
     * Set the element's `justify-content` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content Documentation}
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
     * Set the element's `justify-items` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items Documentation}
     */
    justifyItems: ["center", "end", "normal", "start", "stretch"] as const,
    /**
     * Set the element's `line-height` CSS property
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
    paddingBottom: theme.spacing,
    paddingLeft: theme.spacing,
    paddingRight: theme.spacing,
    paddingTop: theme.spacing,
    /**
     * Set the element's `place-items` CSS property
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/place-items Documentation}
     */
    placeItems: ["center"] as const,
    width: theme.size,
  },
  shorthands: {
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
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/max-height/ Documentation}
     */
    maxH: ["maxHeight"],
    /**
     * Set the element's max-width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/max-width/ Documentation}
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
     * Set the element's width and height
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/size/ Documentation}
     */
    size: ["height", "width"],
    /**
     * Set the element's width
     *
     * {@link https://optimizely-axiom.github.io/optiaxiom/styled-system/width/ Documentation}
     */
    w: ["width"],
  },
});

export const sprinkles = createSprinkles(unresponsiveProps, responsiveProps);
export const mapResponsiveValue = createMapValueFn(
  defineProperties({
    ...conditions,
    properties: {},
  }),
);

type LonghandProps = keyof Pick<
  Parameters<typeof sprinkles>[0],
  | "backgroundColor"
  | "borderBottomWidth"
  | "borderLeftWidth"
  | "borderRadius"
  | "borderRightWidth"
  | "borderTopWidth"
  | "boxShadow"
  | "height"
  | "letterSpacing"
  | "lineHeight"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "marginTop"
  | "maxHeight"
  | "maxWidth"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "width"
  | "zIndex"
>;
export type Sprinkles = Omit<Parameters<typeof sprinkles>[0], LonghandProps>;
