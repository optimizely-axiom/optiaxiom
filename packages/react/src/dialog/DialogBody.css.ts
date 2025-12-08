import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const body = recipe({
  base: [
    {
      flex: "1",
      flexDirection: "column",
      fontSize: "md",
      gap: "16",
      px: "24",
      py: "16",
      z: "0",
    },
    className,
  ],
});
