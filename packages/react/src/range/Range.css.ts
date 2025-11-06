import { theme } from "@optiaxiom/globals";

import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

export const fillValue = createVar();
export const markValue = createVar();

const rootMarker = style({});

export const root = recipe({
  base: [
    rootMarker,
    {
      alignItems: "center",
      color: "fg.default",
      display: "flex",
      fontSize: "md",
      w: "full",
    },
    style({
      position: "relative",

      selectors: {
        "&[data-disabled]": {
          opacity: 0.5,
        },
      },
    }),
  ],
  variants: {
    /**
     * Whether to reserve space for marks along the range track.
     */
    marks: {
      false: {},
      true: {
        mb: "24",
      },
    },
    /**
     * Control the size of the range.
     */
    size: {
      md: {
        h: "md",
      },
      lg: {
        h: "lg",
      },
    },
  },
});

export const track = recipe({
  base: [
    {
      display: "flex",
      flex: "1",
      rounded: "full",
    },
    style({
      backgroundColor: theme.colors["bg.tertiary"],
      height: 8,
      position: "relative",
      touchAction: "none",
      userSelect: "none",

      selectors: {
        [`${rootMarker}:not([data-disabled]) &`]: {
          cursor: "pointer",
        },
      },
    }),
  ],
});

export const range = recipe({
  base: [
    {
      h: "full",
      rounded: "inherit",
    },
    style({
      backgroundColor: theme.colors["bg.accent"],
      position: "absolute",
      width: `calc(100% * ${fillValue} + 10px * (1 - ${fillValue}))`,

      selectors: {
        [`${rootMarker}[data-disabled] &`]: {
          backgroundColor: theme.colors["border.control"],
        },
      },
    }),
  ],
});

export const thumb = recipe({
  base: [
    {
      border: "1",
      rounded: "full",
      shadow: "sm",
      size: "xs",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      left: `calc(${fillValue} * 100%)`,
      position: "absolute",
      top: -6,
      transform: `translateX(calc(-1 * ${fillValue} * 100%))`,

      selectors: {
        [`${rootMarker}:has(input[type=range]:focus-visible) &`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "2px",
        },
      },
    }),
  ],
});

export const control = recipe({
  base: [
    {
      bg: "transparent",
    },
    style({
      appearance: "none",
      inset: 0,
      outline: "none",
      position: "absolute",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:not(:disabled)::-webkit-slider-thumb:hover": {
              cursor: "grab",
            },
          },
        },
      },

      selectors: {
        "&::-webkit-slider-runnable-track": {
          height: "100%",
        },
        "&::-webkit-slider-thumb": {
          appearance: "none",
          background: "transparent",
          borderRadius: "100%",
          height: 20,
          marginTop: -6,
          transform: "scale(2)",
          width: 20,
        },
        "&:not(:disabled)": {
          cursor: "pointer",
        },
        "&:not(:disabled):active": {
          cursor: "grabbing",
        },
      },
    }),
  ],
});

export const mark = recipe({
  base: [
    {
      transition: "colors",
    },
    style({
      left: `calc(${markValue} * 100%)`,
      position: "absolute",
      top: "100%",
      translate: `calc(-1 * ${markValue} * 100%) 4px`,

      selectors: {
        [`${rootMarker}:not([data-disabled]) &`]: {
          cursor: "pointer",
        },
      },
    }),
  ],
  variants: {
    active: {
      false: {
        color: "fg.secondary",
      },
      true: {},
    },
  },
});

export type RangeVariants = RecipeVariants<typeof root>;
