import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    style({
      maxHeight: "90vh",
      maxWidth: "480px",
      minWidth: "350px",
      position: "absolute",
    }),
  ],
});

export const overlay = recipe({
  base: [
    style({
      position: "absolute",
    }),
  ],
});
