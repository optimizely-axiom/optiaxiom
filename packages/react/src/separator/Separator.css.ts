import { theme } from "../styles";
import { type RecipeVariants, recipe } from "../vanilla-extract";

export const separator = recipe({
  base: {
    backgroundColor: theme.colors["border.default"],
  },

  variants: {
    orientation: {
      horizontal: {},
      vertical: { alignSelf: "stretch" },
    },
  },
});

export type SeparatorVariants = RecipeVariants<typeof separator>;
