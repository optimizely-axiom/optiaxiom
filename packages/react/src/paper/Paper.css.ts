import { recipe, type RecipeVariants } from "../vanilla-extract";

export const paper = recipe({
  base: {
    bg: "bg.default",
    shadow: "md",
    z: "popover",
  },

  variants: {
    elevation: {
      dialog: {
        rounded: "lg",
      },
      drawer: {},
      menu: {
        border: "1",
        borderColor: "border.secondary",
        rounded: "lg",
      },
    },
  },
});

export type PaperVariants = RecipeVariants<typeof paper>;
