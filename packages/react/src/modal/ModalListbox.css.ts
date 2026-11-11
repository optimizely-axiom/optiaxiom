import { theme } from "@optiaxiom/globals";

import { rem } from "../utils";
import {
  createVar,
  fallbackVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const maxHeightVar = createVar();
const maxWidthVar = createVar();
// Not inherited, so a listbox nested inside list content doesn't pick up its
// floor.
const minWidthVar = createVar({
  inherits: false,
  initialValue: "0px",
  syntax: "<length>",
});

/**
 * Minimum width for list content (menus, selects) so short option lists don't
 * shrink to a sliver.
 */
export const list = recipe({
  base: style({
    vars: {
      [minWidthVar]: rem("120px"),
    },
  }),
});

export const listbox = recipe({
  base: [
    {
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
      maxWidth: `
        min(
          var(--radix-popper-available-width),
          ${fallbackVar(maxWidthVar, theme.maxSize.xs)}
        )
      `,
      minWidth: minWidthVar,
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
     * Whether to restrict the max-width of the content.
     *
     * Content is also restricted by the available width in the screen.
     */
    maxW: {
      xs: style({
        vars: {
          [maxWidthVar]: theme.maxSize.xs,
        },
      }),
      sm: style({
        vars: {
          [maxWidthVar]: theme.maxSize.sm,
        },
      }),
      md: style({
        vars: {
          [maxWidthVar]: theme.maxSize.md,
        },
      }),
      lg: style({
        vars: {
          [maxWidthVar]: theme.maxSize.lg,
        },
      }),
      full: style({
        vars: {
          [maxWidthVar]: "100%",
        },
      }),
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
            ${minWidthVar}
          )
        `,
      }),
    },
  },
});

export type ListboxVariants = RecipeVariants<typeof listbox>;
