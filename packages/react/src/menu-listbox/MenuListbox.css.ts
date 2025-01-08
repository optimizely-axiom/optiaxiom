import { theme } from "@optiaxiom/globals";

import {
  createVar,
  fallbackVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

export const contentAvailableHeightVar = createVar();
const maxHeightVar = createVar();
export const triggerWidth = createVar();

export const listbox = recipe({
  base: [
    {
      maxW: "xs",
      p: "4",
    },
    style({
      maxHeight: `min(${contentAvailableHeightVar}, ${fallbackVar(maxHeightVar, "100vh")})`,
    }),
  ],

  variants: {
    /**
     * Whether to restrict the max-height of the content.
     *
     * Content is also restricted by the available height in the screen relative to the trigger.
     */
    maxH: {
      xs: style({
        vars: {
          [maxHeightVar]: theme.maxSize.xs,
        },
      }),
      sm: style({
        vars: {
          [maxHeightVar]: theme.maxSize.sm,
        },
      }),
      md: style({
        vars: {
          [maxHeightVar]: theme.maxSize.md,
        },
      }),
      lg: style({
        vars: {
          [maxHeightVar]: theme.maxSize.lg,
        },
      }),
      full: {},
    },
    /**
     * Whether to set the min-width to the width of the trigger.
     */
    minW: {
      "0": {},
      trigger: style({
        minWidth: triggerWidth,
      }),
    },
    provider: {
      "dropdown-menu": style({
        vars: {
          [contentAvailableHeightVar]:
            "var(--radix-dropdown-menu-content-available-height)",
          [triggerWidth]: "var(--radix-dropdown-menu-trigger-width)",
        },
      }),
      popover: style({
        vars: {
          [contentAvailableHeightVar]:
            "var(--radix-popover-content-available-height)",
          [triggerWidth]: "var(--radix-popover-trigger-width)",
        },
      }),
      popper: style({
        vars: {
          [contentAvailableHeightVar]: "var(--radix-popper-available-height)",
          [triggerWidth]: "var(--radix-popper-anchor-width)",
        },
      }),
    },
  },
});

export type ListboxVariants = RecipeVariants<typeof listbox>;
