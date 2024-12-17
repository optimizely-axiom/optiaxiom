import { theme } from "@optiaxiom/globals";
import { defineProperties } from "@vanilla-extract/sprinkles";

import { layers } from "../layers";
import { conditions, mapValues } from "../utils";
import { keyframes } from "../vanilla-extract";
const merge = <A, B>(objA: A, objB: B): A & B => ({ ...objA, ...objB });
const rem = <P extends `${string}px`>(px: P) =>
  `${parseFloat((parseFloat(px.slice(0, -2)) / 16).toFixed(3))}rem` as P;

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

const borderWidths = {
  "0": "0",
  "1": "1px",
  "2": "2px",
} as const;

const colors = <P extends string>(prefix: P) =>
  merge(
    Object.fromEntries(
      Object.entries(theme.colors).filter(([name]) => name.startsWith(prefix)),
    ) as {
      [Key in keyof typeof theme.colors as Key extends `${P}${string}`
        ? Key
        : never]: (typeof theme.colors)[Key];
    },
    {
      current: "currentColor",
      transparent: "transparent",
    },
  );

const spacing = {
  "0": "0",
  "2": rem("2px"),
  "4": rem("4px"),
  "6": rem("6px"),
  "8": rem("8px"),
  "10": rem("10px"),
  "12": rem("12px"),
  "16": rem("16px"),
  "20": rem("20px"),
  "24": rem("24px"),
  "32": rem("32px"),
} as const;
const margins = merge(spacing, { auto: "auto" });

const maxSizes = merge(theme.maxSize, { full: "100%" });

const radiuses = merge(theme.borderRadius, {
  inherit: "inherit",
  none: "0",
});

const shadows = merge(theme.boxShadow, {
  none: "0 0 #0000",
});

const transitions = {
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
} as const;

const sizes = merge(theme.size, {
  "0": "0",
  "10": rem("10px"),
  "12": rem("12px"),
  "16": rem("16px"),
  "20": rem("20px"),
  "24": rem("24px"),
  "32": rem("32px"),
  "40": rem("40px"),
  "48": rem("48px"),
  "56": rem("56px"),
  "64": rem("64px"),
  "80": rem("80px"),
  "224": rem("224px"),
  "384": rem("384px"),

  "1/2": "50%",

  "1/3": "33.333333%",
  "2/3": "66.666666%",

  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",

  auto: "auto",
  fit: "fit-content",
  full: "100%",
  max: "max-content",
  min: "min-content",
});

const zIndexes = merge(theme.zIndex, {
  "0": "0",
  "10": "10",
  "20": "20",
  "30": "30",
  auto: "auto",
});

export const unresponsiveProps = defineProperties({
  "@layer": layers.axiom,
  properties: {
    /**
     * Animate element with CSS animations
     */
    animation: {
      ping: `${animations.ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
      pulse: `${animations.pulse} 2s ease-in-out infinite`,
      spin: `${animations.spin} 1s linear infinite`,
    },
    backgroundColor: colors("bg."),
    borderBottomWidth: borderWidths,
    /**
     * Set the element's `border-color` CSS property
     */
    borderColor: colors("border."),
    borderLeftWidth: borderWidths,
    borderRadius: radiuses,
    borderRightWidth: borderWidths,
    borderTopWidth: borderWidths,
    boxShadow: shadows,
    /**
     * Set the element's text color
     */
    color: colors("fg."),
    /**
     * Set the element's `cursor` CSS property
     */
    cursor: ["pointer", "default", "not-allowed", "text"] as const,
    /**
     * Toggle element visibility based on `:empty` pseudo-class
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
     */
    fontFamily: theme.fontFamily,
    /**
     * Set the element's `font-size` and `line-height` CSS properties
     */
    fontSize: merge(theme.fontSize, {
      inherit: {
        fontSize: "inherit",
        lineHeight: "inherit",
      },
    }),
    /**
     * Set the element's `font-weight` CSS property
     */
    fontWeight: ["400", "500", "600", "700"] as const,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    /**
     * Set the element's `object-fit` CSS property
     */
    objectFit: ["contain", "cover", "fill", "none"] as const,
    /**
     * Set the element's `overflow-x` CSS property
     */
    overflowX: ["auto", "hidden", "visible"] as const,
    /**
     * Set the element's `overflow-y` CSS property
     */
    overflowY: ["auto", "hidden", "visible"] as const,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingTop: spacing,
    /**
     * Set the element's `pointer-events` CSS property
     */
    pointerEvents: ["auto", "none"] as const,
    /**
     * Set the element's `text-align` CSS property
     */
    textAlign: ["end", "start", "center", "justify"] as const,
    /**
     * Set the element's `text-transform` CSS property
     */
    textTransform: ["capitalize", "none", "uppercase"] as const,
    /**
     * Control which CSS properties should transition
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
      none: {
        transitionProperty: "none",
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
     */
    whiteSpace: ["nowrap"] as const,
    /**
     * Set the element's z-index
     */
    zIndex: zIndexes,
  },
  shorthands: {
    /**
     * Set the element's background color
     */
    bg: ["backgroundColor"],
    /**
     * Set the element's `border-width` CSS property
     */
    border: [
      "borderBottomWidth",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
    ],
    /**
     * Set the element's `border-bottom-width` CSS property
     */
    borderB: ["borderBottomWidth"],
    /**
     * Set the element's `border-left-width` CSS property
     */
    borderL: ["borderLeftWidth"],
    /**
     * Set the element's `border-right-width` CSS property
     */
    borderR: ["borderRightWidth"],
    /**
     * Set the element's `border-top-width` CSS property
     */
    borderT: ["borderTopWidth"],

    /**
     * Set the element's margin on all sides
     */
    m: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
    /**
     * Set the element's left and right margin
     */
    mx: ["marginLeft", "marginRight"],
    /**
     * Set the element's top and bottom margin
     */
    my: ["marginBottom", "marginTop"],

    /**
     * Set the element's bottom margin
     */
    mb: ["marginBottom"],
    /**
     * Set the element's left margin
     */
    ml: ["marginLeft"],
    /**
     * Set the element's right margin
     */
    mr: ["marginRight"],
    /**
     * Set the element's top margin
     */
    mt: ["marginTop"],

    /**
     * Set the element's `overflow` CSS property
     */
    overflow: ["overflowX", "overflowY"],

    /**
     * Set the element's padding on all sides
     */
    p: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
    /**
     * Set the element's left and right padding
     */
    px: ["paddingLeft", "paddingRight"],
    /**
     * Set the element's top and bottom padding
     */
    py: ["paddingBottom", "paddingTop"],

    /**
     * Set the element's bottom padding
     */
    pb: ["paddingBottom"],
    /**
     * Set the element's left padding
     */
    pl: ["paddingLeft"],
    /**
     * Set the element's right padding
     */
    pr: ["paddingRight"],
    /**
     * Set the element's top padding
     */
    pt: ["paddingTop"],

    /**
     * Set the element's border radius on all corners
     */
    rounded: ["borderRadius"],
    /**
     * Set the element's box shadow
     */
    shadow: ["boxShadow"],
    /**
     * Set the element's stack order
     */
    z: ["zIndex"],
  },
});

export const responsiveProps = defineProperties({
  "@layer": layers.axiom,
  ...conditions,
  properties: {
    /**
     * Set the element's `align-items` CSS property
     */
    alignItems: [
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
     * Set the element's `align-self` CSS property
     */
    alignSelf: ["center", "end", "normal", "start", "stretch"] as const,
    /**
     * Set the element's `display` CSS property
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
     */
    flex: {
      "1": "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
    },
    /**
     * Set the element's `flex-direction` CSS property
     */
    flexDirection: ["column", "column-reverse", "row", "row-reverse"] as const,
    /**
     * Set the element's `flex-wrap` CSS property
     */
    flexWrap: ["nowrap", "wrap"] as const,
    /**
     * Set the element's `gap` CSS property
     */
    gap: spacing,
    /**
     * Set the element's size across grid columns
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
    height: sizes,
    /**
     * Set the element's `justify-content` CSS property
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
     */
    justifyItems: ["center", "end", "normal", "start", "stretch"] as const,
    maxHeight: maxSizes,
    maxWidth: maxSizes,
    /**
     * Set the element's `place-items` CSS property
     */
    placeItems: ["center"] as const,
    width: sizes,
  },
  shorthands: {
    /**
     * Set the element's max-height
     */
    maxH: ["maxHeight"],
    /**
     * Set the element's max-width
     */
    maxW: ["maxWidth"],

    /**
     * Set the element's width and height
     */
    size: ["height", "width"],

    /**
     * Set the element's height
     */
    h: ["height"],
    /**
     * Set the element's width
     */
    w: ["width"],
  },
});
