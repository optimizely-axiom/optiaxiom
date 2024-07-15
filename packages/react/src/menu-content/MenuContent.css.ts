import { theme } from "../styles";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      border: "1",
      py: "xs",
      rounded: "sm",
    },
    style({
      boxShadow: theme.boxShadow.md,
    }),
  ],
});
