import { sprinkles } from "../sprinkles";
import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const separator = recipe({
  base: {
    backgroundColor: theme.colors["border.default"],
  },

  variants: {
    orientation: {
      horizontal: sprinkles({
        my: "sm",
      }),
      vertical: style([
        { alignSelf: "stretch" },
        sprinkles({
          mx: "sm",
        }),
      ]),
    },
  },
});

export type SeparatorVariants = RecipeVariants<typeof separator>;
