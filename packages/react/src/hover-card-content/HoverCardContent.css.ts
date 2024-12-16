import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      fontSize: "md",
      gap: "2",
      maxW: "xs",
      p: "12",
    },
    style({
      minWidth: "var(--radix-hover-card-trigger-width)",
      position: "relative",
    }),
  ],
});
