import { theme } from "@optiaxiom/globals";

import { mapValues } from "../utils";
import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const transition = recipe({
  base: style({
    transformOrigin: "var(--radix-popper-transform-origin)",
    transitionProperty: "opacity, scale, transform",
    transitionTimingFunction: "ease",

    selectors: {
      "&[data-transition-fade]": {
        opacity: 0,
      },
      "&[data-transition-pop]": {
        scale: 0.95,
      },
      '&[data-transition-translate][data-side="bottom"]': {
        transform: "translateY(-8px)",
      },
      '&[data-transition-translate][data-side="left"]': {
        transform: "translateX(8px)",
      },
      '&[data-transition-translate][data-side="right"]': {
        transform: "translateX(-8px)",
      },
      '&[data-transition-translate][data-side="top"]': {
        transform: "translateY(8px)",
      },
    },
  }),

  variants: {
    /**
     * Control the duration of the animation.
     */
    duration: mapValues(theme.duration, (transitionDuration) =>
      style({ transitionDuration }),
    ),
  },
});

export type TransitionVariants = RecipeVariants<typeof transition>;
