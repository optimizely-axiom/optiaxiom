import { recipe } from "../vanilla-extract";

export const footer = recipe({
  base: [
    {
      borderColor: "border.secondary",
      flexDirection: "row",
      gap: "16",
      justifyContent: "flex-end",
      px: "24",
      py: "20",
    },
  ],
});
