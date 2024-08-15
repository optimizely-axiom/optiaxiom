import { recipe } from "../vanilla-extract";

export const className = "ax-AvatarGroup";

export const avatarGroup = recipe({
  base: [
    className,
    {
      display: "flex",
    },
  ],
});
