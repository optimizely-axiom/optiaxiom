import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: style({
    minWidth: theme.size.md,
  }),
});
