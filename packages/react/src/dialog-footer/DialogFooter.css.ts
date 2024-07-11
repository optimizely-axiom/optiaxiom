import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const footer = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "md",
      justifyContent: "end",
      px: "24",
      py: "20",
    },
    style({
      borderTop: `1px solid ${theme.colors["border.secondary"]}`,
    }),
  ],
});
