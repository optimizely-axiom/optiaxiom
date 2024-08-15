import { recipe } from "../vanilla-extract";

export const wrapper = recipe({
  base: [
    {
      border: "1",
      pb: "md",
      pt: "lg",
    },
  ],
});
export const nav = recipe({
  base: [
    {
      display: "flex",
      w: "full",
    },
  ],
});
