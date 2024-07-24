import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const search = recipe({
  base: marker,
});

export const clear = recipe({
  base: [
    {
      rounded: "full",
      size: "sm",
    },
    style({
      selectors: {
        [`${marker}:not(:focus-within):not(:hover) &`]: {
          visibility: "hidden",
        },
      },
    }),
  ],
});
