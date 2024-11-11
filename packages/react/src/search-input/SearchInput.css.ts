import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const search = recipe({
  base: marker,
});

export const clear = recipe({
  base: [
    {
      my: "-2",
      size: "sm",
    },
    style({
      selectors: {
        [`${marker}:is(:not(:focus-within):not(:hover), :has(input:disabled)) &`]:
          {
            visibility: "hidden",
          },
      },
    }),
  ],
});
