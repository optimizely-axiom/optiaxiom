import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const row = recipe({
  base: [
    className,
    {
      w: "full",
    },
  ],
});
