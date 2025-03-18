import { recipe, style } from "../vanilla-extract";

export const layout = recipe({
  base: [
    {
      bg: "bg.page",
      display: "flex",
      flexDirection: "column",
      fontSize: "md",
    },
    style({
      height: "100vh",
      width: "100vw",
    }),
  ],
});
