import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

export const contentAvailableHeightVar = createVar();
export const triggerWidth = createVar();

export const listbox = recipe({
  base: [
    {
      maxW: "xs",
      p: "4",
    },
    style({
      maxHeight: contentAvailableHeightVar,
    }),
  ],

  variants: {
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
