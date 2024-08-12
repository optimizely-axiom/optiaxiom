import { recipe } from "../vanilla-extract";

export const footer = recipe({
  base: [
    {
      borderColor: "border.secondary",
      borderT: "1",
      flexDirection: "row",
      gap: "md",
      justifyContent: "end",
      p: "md",
    },
  ],
});
