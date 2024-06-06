import { sprinkles } from "../sprinkles";
import { theme } from "../styles";
import { type RecipeVariants, recipe } from "../vanilla-extract";

export const separator = recipe({
  base: {
    backgroundColor: theme.colors["bg.brand.solid"],
  },
  defaultVariants: {
    orientation: "horizontal",
  },
  variants: {
    orientation: {
      horizontal: sprinkles({
        h: "2",
        my: "6",
        w: "full",
      }),
      vertical: sprinkles({
        h: "full",
        mx: "6",
        w: "2",
      }),
    },
  },
});

export type SeparatorVaiants = RecipeVariants<typeof separator>;
