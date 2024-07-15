import { recipe } from "../vanilla-extract";

export const wrapper = recipe({
  base: [
    {
      gap: "xs",
    },
  ],
});

export const item = recipe({
  base: [
    {
      fontSize: "md",
      // border: "1",
      px: "md",
      py: "10",
    },
  ],
});
