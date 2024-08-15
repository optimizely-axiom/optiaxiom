import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const avatarGroup = recipe({
  base: [
    className,
    {
      display: "flex",
    },
  ],
});
