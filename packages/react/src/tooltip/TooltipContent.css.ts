import { recipe, type RecipeVariants } from "../vanilla-extract";

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

export type ContentVariants = RecipeVariants<typeof content>;
