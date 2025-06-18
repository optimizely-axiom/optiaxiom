import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const body = recipe({
  base: [
    {
      flex: "1",
      fontSize: "md",
      px: "24",
      py: "16",
      z: "0",
    },
    className,
  ],
});
