import { recipe, style } from "../vanilla-extract";

export const head = recipe({
  base: [
    {
      color: "fg.tertiary",
      fontSize: "sm",
      fontWeight: "400",
      px: "md",
      py: "sm",
      textAlign: "start",
    },
    style({
      verticalAlign: "middle",
    }),
  ],
});
