import { recipe } from "../vanilla-extract";

export const body = recipe({
  base: [
    {
      flex: "1",
      fontSize: "md",
      overflow: "auto",
      px: "24",
      py: "16",
    },
  ],
});