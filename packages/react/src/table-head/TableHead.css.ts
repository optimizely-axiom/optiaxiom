import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const head = recipe({
  base: [
    {
      fontWeight: "500",
      h: "32",
      p: "sm",
    },
    style({
      ":last-of-type": {
        borderRight: "0",
      },
      borderBottom: `1px solid ${theme.colors["gray.200"]}`,
      borderRight: `1px solid ${theme.colors["gray.200"]}`,
      textAlign: "left",
      verticalAlign: "middle",
    }),
  ],
});
