import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const search = recipe({
  base: marker,
});

export const input = recipe({
  base: style({
    selectors: {
      /**
       * Hide browser default icons inside inputs
       */
      "&::-webkit-search-cancel-button, &::-webkit-search-decoration": {
        display: "none",
        WebkitAppearance: "none",
      },
    },
  }),
});

export const clear = recipe({
  base: [
    {
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
