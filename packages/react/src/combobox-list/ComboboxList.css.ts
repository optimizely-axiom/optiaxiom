import { recipe, style } from "../vanilla-extract";

export const list = recipe({
  base: [
    style({
      overflow: "auto",
      overscrollBehavior: "contain",
      transition: "100ms ease",
      transitionProperty: "height",
    }),
  ],
});
