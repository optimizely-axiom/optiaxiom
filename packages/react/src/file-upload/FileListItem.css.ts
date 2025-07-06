import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const item = recipe({
  variants: {
    /**
     * The layout view for the file list item
     */
    view: {
      grid: {
        alignItems: "center",
        flexDirection: "column",
        gap: "8",
        textAlign: "center",
        w: "lg",
      },
      list: {
        alignItems: "center",
        flexDirection: "row",
        gap: "12",
        textAlign: "center",
        w: "full",
      },
    },
  },
});

export const image = recipe({
  base: {
    rounded: "lg",
  },
  variants: {
    /**
     * The layout view for the file list item
     */
    view: {
      grid: style({
        maxHeight: "40px",
        width: "40px",
      }),
      list: style({
        maxHeight: "24px",
        width: "24px",
      }),
    },
  },
});

export type FileListItemImageVariants = RecipeVariants<typeof image>;
export type FileListItemVariants = RecipeVariants<typeof item>;
