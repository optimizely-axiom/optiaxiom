import { theme } from "@optiaxiom/globals";

import {
  createVar,
  fallbackVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const maxHeightVar = createVar();

export const listbox = recipe({
  base: [
    {
      maxW: "xs",
      p: "4",
    },
    style({
      maxHeight: `
        min(
          var(
            --radix-dropdown-menu-content-available-height,
            var(
              --radix-popover-content-available-height,
              var(--radix-popper-available-height)
            )
          ),
          ${fallbackVar(maxHeightVar, "100vh")}
        )
      `,
      minWidth: "120px",
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
        minWidth: `
          max(
            var(
              --radix-dropdown-menu-trigger-width,
              var(
                --radix-popover-trigger-width,
                var(--radix-popper-anchor-width)
              )
            ),
            120px
          )
        `,
      }),
    },
  },
});

export type ListboxVariants = RecipeVariants<typeof listbox>;
