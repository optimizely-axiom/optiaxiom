import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

const hidden = "&:is([data-starting-style], [data-ending-style])";

export const content = recipe({
  base: [
    {
      bg: "bg.default.inverse",
      color: "fg.default.inverse",
      maxW: "xs",
      px: "12",
      py: "8",
      rounded: "md",
      z: "tooltip",
    },
    style({
      overflow: "visible",
    }),
  ],
  variants: {
    /**
     * When `true`, trying to hover the content will result in the tooltip
     * closing as the pointer leaves the trigger.
     *
     * @defaultValue false
     */
    disableHoverableContent: {
      false: {},
      true: {
        pointerEvents: "none",
      },
    },
  },
});

export const transition = recipe({
  base: style({
    transformOrigin: "var(--transform-origin)",
    transitionDuration: theme.duration.sm,
    transitionProperty: "opacity, scale, transform",
    transitionTimingFunction: "ease",

    selectors: {
      [`${hidden}[data-side="bottom"]`]: {
        transform: "translateY(-8px)",
      },
      [`${hidden}[data-side="left"]`]: {
        transform: "translateX(8px)",
      },
      [`${hidden}[data-side="right"]`]: {
        transform: "translateX(-8px)",
      },
      [`${hidden}[data-side="top"]`]: {
        transform: "translateY(8px)",
      },
      [hidden]: {
        opacity: 0,
        scale: 0.95,
      },
    },
  }),
});

export const arrow = recipe({
  base: style({
    backgroundColor: theme.colors["bg.default.inverse"],
    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
    height: "4px",
    width: "8px",

    selectors: {
      '&[data-side="bottom"]': {
        bottom: "100%",
        clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
      },
      '&[data-side="left"]': {
        clipPath: "polygon(0 0, 100% 50%, 0 100%)",
        height: "8px",
        left: "100%",
        width: "4px",
      },
      '&[data-side="right"]': {
        clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
        height: "8px",
        right: "100%",
        width: "4px",
      },
      '&[data-side="top"]': {
        top: "100%",
      },
    },
  }),
});

export type ContentVariants = RecipeVariants<typeof content>;
