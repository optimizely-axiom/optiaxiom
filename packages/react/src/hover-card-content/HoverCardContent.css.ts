import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      fontSize: "md",
      gap: "2",
      p: "sm",
    },
    style({
      minWidth: "var(--radix-hover-card-trigger-width)",
      position: "relative",
    }),
  ],
});
