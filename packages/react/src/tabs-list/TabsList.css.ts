import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const list = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "0",
      overflow: "auto",
    },
    style({
      borderBottom: `1px solid ${theme.colors["border.default"]}`,
    }),
  ],
});
