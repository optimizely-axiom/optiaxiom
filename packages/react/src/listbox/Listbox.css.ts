import { theme } from "@optiaxiom/globals";

import {
  createVar,
  keyframes,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

// Width of the fade, the scroll distance it grows over, and the scroll padding
// that keeps scrolled-into-view items clear of it.
const fadeSize = theme.size.sm;

// Registered so keyframes can interpolate them.
const fadeTopVar = createVar({
  inherits: false,
  initialValue: "0px",
  syntax: "<length>",
});
const fadeBottomVar = createVar({
  inherits: false,
  initialValue: "0px",
  syntax: "<length>",
});

const fadeTop = keyframes({
  from: { vars: { [fadeTopVar]: "0px" } },
  to: { vars: { [fadeTopVar]: fadeSize } },
});
const fadeBottom = keyframes({
  from: { vars: { [fadeBottomVar]: fadeSize } },
  to: { vars: { [fadeBottomVar]: "0px" } },
});

export const listbox = recipe({
  base: [
    {
      display: "flex",
      flex: "1",
      flexDirection: "column",
      gap: "2",
      overflow: "auto",
    },
    style({
      overscrollBehavior: "contain",
    }),
  ],

  variants: {
    /**
     * Whether to fade the edges that have more items scrolled past them.
     *
     * The fade is a mask, so it also clips a shadow on the same element: put
     * surfaces like `Paper` on a wrapper.
     */
    mask: {
      false: {},
      true: style({
        // Gated on support: without a scroll timeline the animations would run
        // on the document timeline and hold their end values, fading the top
        // for good.
        "@supports": {
          "(animation-timeline: scroll())": {
            animationFillMode: "both",
            animationName: `${fadeTop}, ${fadeBottom}`,
            animationRange: `0 ${fadeSize}, calc(100% - ${fadeSize}) 100%`,
            animationTimeline: "scroll(self), scroll(self)",
            animationTimingFunction: "linear",
            maskImage: `linear-gradient(to bottom, transparent, #000 ${fadeTopVar}, #000 calc(100% - ${fadeBottomVar}), transparent)`,
            scrollPaddingBlock: fadeSize,
          },
        },
      }),
    },
  },
});

export type ListboxVariants = RecipeVariants<typeof listbox>;
