import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const wrapper = recipe({
  base: [marker],
});
export const icon = recipe({
  base: [
    style({
      selectors: {
        [`${marker}[data-state=open] &`]: {
          transform: "rotate(180deg)",
        },
      },
    }),
  ],
});
