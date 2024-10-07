import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const content = recipe({
  base: [
    {
      p: "4",
    },
    style({
      selectors: {
        [`&:has(${marker}:empty)`]: {
          visibility: "hidden",
        },
      },
    }),
  ],
});

export const list = recipe({
  base: [
    marker,
    style({
      overflow: "auto",
      overscrollBehavior: "contain",
    }),
  ],
});
