import { recipe, style } from "../vanilla-extract";

export const avatarGroup = recipe({
  base: [
    {
      display: "flex",
    },
  ],
});

export const pointer = recipe({
  base: [
    style({
      cursor: "pointer",
    }),
  ],
});
