import { recipe } from "../vanilla-extract";

export const footer = recipe({
  base: [
    {
      borderColor: "border.secondary",
      borderT: "1",
      flexDirection: "row",
      gap: "16",
      justifyContent: "end",
      px: "24",
      py: "20",
    },
  ],
});
