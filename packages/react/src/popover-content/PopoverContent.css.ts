import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "bg.default",
      border: "1",
      borderColor: "border.secondary",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      p: "sm",
      rounded: "lg",
      shadow: "md",
      z: "popover",
    },
    style({
      maxHeight: "var(--radix-popover-content-available-height)",
      position: "relative",
    }),
  ],
  variants: {
    minW: {
      "0": {},
      trigger: style({
        minWidth: "var(--radix-popover-trigger-width)",
      }),
    },
  },
});

export type ContentVariants = RecipeVariants<typeof content>;
