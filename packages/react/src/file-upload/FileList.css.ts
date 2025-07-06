import { recipe, type RecipeVariants } from "../vanilla-extract";

export const root = recipe({
  variants: {
    /**
     * Grid layout with items arranged
     */
    view: {
      grid: {
        alignItems: "start",
        flexDirection: "row",
        gap: "8",
      },
      list: {
        alignItems: "center",
        flexDirection: "column",
        gap: "12",
      },
    },
  },
});

export type FileListVariants = RecipeVariants<typeof root>;
