import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "surface",
      border: "1",
      borderColor: "border.secondary",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      maxW: "xs",
      overflow: "auto",
      p: "4",
      rounded: "lg",
      shadow: "md",
      z: "popover",
    },
    style({
      maxHeight: "var(--radix-dropdown-menu-content-available-height)",
    }),
  ],

  variants: {
    minW: {
      "0": {},
      trigger: style({
        minWidth: "var(--radix-dropdown-menu-trigger-width)",
      }),
    },
  },
});

export type ContentVariants = RecipeVariants<typeof content>;
