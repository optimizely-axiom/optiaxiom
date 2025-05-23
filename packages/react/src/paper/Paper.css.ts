import { recipe, type RecipeVariants } from "../vanilla-extract";

export const paper = recipe({
  base: {
    bg: "bg.default",
    color: "fg.default",
    shadow: "md",
    z: "popover",
  },

  variants: {
    /**
     * Which elevation to use for the paper.
     */
    elevation: {
      dialog: {
        rounded: "lg",
      },
      menu: {
        border: "1",
        borderColor: "border.secondary",
        rounded: "lg",
      },
      screen: {},
    },
  },
});

export type PaperVariants = RecipeVariants<typeof paper>;
