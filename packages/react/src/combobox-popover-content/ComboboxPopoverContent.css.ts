import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const content = recipe({
  variants: {
    minW: {
      "0": {},
      trigger: style({
        minWidth: "var(--radix-popover-trigger-width)",
      }),
    },
  },
});

export type ContentVariants = NonNullable<RecipeVariants<typeof content>>;
