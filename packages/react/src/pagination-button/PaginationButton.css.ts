import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const paginationButton = recipe({
  variants: {
    active: {
      false: {},
      true: style({
        backgroundColor: theme.colors["bg.brand"],
        color: theme.colors["bg.brand.solid"],
      }),
    },
  },
});
