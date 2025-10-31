import { recipe } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "bg.default.inverse",
      color: "fg.default.inverse",
      maxW: "xs",
      px: "12",
      py: "8",
      rounded: "md",
      z: "tooltip",
    },
  ],
});
