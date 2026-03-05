import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const root = recipe({
  base: [
    {},
    marker,
    style({
      position: "relative",
    }),
  ],
});

export const actions = recipe({
  base: [
    {
      justifyContent: "center",
    },
    style({
      bottom: 8,
      position: "absolute",
      right: 8,
    }),
  ],
});
