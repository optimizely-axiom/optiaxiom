import { theme } from "@optiaxiom/globals";

import { createVar, keyframes, recipe, style } from "../vanilla-extract";

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

// Set with or without the fade: ListboxVirtualized scrolls by the same padding.
const scrollPadding = style({
  scrollPaddingBlock: fadeSize,
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
    mask: {
      false: {},
      // Scroll padding without the fade, for when animations are skipped.
      static: scrollPadding,
      true: [
        scrollPadding,
        style({
          // Gated on support: without a scroll timeline the animations would
          // run on the document timeline and hold their end values, fading the
          // top for good.
          "@supports": {
            "(animation-timeline: scroll())": {
              animationFillMode: "both",
              animationName: `${fadeTop}, ${fadeBottom}`,
              animationRange: `0 ${fadeSize}, calc(100% - ${fadeSize}) 100%`,
              animationTimeline: "scroll(self), scroll(self)",
              animationTimingFunction: "linear",
              maskImage: `linear-gradient(to bottom, transparent, #000 ${fadeTopVar}, #000 calc(100% - ${fadeBottomVar}), transparent)`,
            },
          },
        }),
      ],
    },
  },
});
