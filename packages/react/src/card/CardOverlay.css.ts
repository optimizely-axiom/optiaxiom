import { recipe, style } from "../vanilla-extract";

export const overlay = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
    },
    style({
      insetInline: "0",
      padding: "16px",
      position: "absolute",
      top: "0",
    }),
  ],
});
