import { recipe } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "bg.neutral.inverse",
      color: "white",
      px: "12",
      py: "8",
      rounded: "lg",
      z: "tooltip",
    },
  ],
});
