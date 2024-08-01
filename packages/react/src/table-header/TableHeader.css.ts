import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const header = recipe({
  base: [
    {
      bg: "bg.neutral",
    },
    style({
      borderBottom: `1px solid ${theme.colors["gray.200"]}`,
    }),
  ],
});
