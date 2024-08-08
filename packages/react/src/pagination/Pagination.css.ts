import { recipe, style } from "../vanilla-extract";

export const pagination = recipe({
  base: [
    style({
      selectors: {
        '&[data-disabled="true"]': {
          opacity: 0.5,
          pointerEvents: "none",
        },
      },
    }),
  ],
});

export const list = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "2",
    },
  ],
});
