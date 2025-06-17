import { recipe, style } from "../vanilla-extract";

export const footer = recipe({
  base: [
    {
      bg: "bg.default",
      borderColor: "border.secondary",
      borderT: "1",
      flexDirection: "row",
      gap: "16",
      justifyContent: "flex-end",
      px: "24",
      py: "20",
    },
    style({
      bottom: "0",
      position: "sticky",
    }),
  ],
});
