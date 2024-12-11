import { recipe, style } from "../vanilla-extract";

export const head = recipe({
  base: [
    {
      color: "fg.tertiary",
      fontSize: "sm",
      fontWeight: "400",
      px: "16",
      py: "12",
      textAlign: "start",
    },
    style({
      verticalAlign: "middle",
    }),
  ],
});
