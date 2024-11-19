import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

export const contentAvailableHeightVar = createVar();
export const triggerWidth = createVar();

export const content = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      gap: "2",
      maxW: "xs",
      overflow: "auto",
      p: "4",
    },
    style({
      maxHeight: contentAvailableHeightVar,
    }),
  ],

  variants: {
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

export type ContentVariants = RecipeVariants<typeof content>;
