import { keyframes, recipe, style } from "../vanilla-extract";

const slideDown = keyframes({
  from: {
    height: 0,
  },
  to: {
    height: "var(--radix-accordion-content-height)",
  },
});

const slideUp = keyframes({
  from: {
    height: "var(--radix-accordion-content-height)",
  },
  to: {
    height: 0,
  },
});

export const content = recipe({
  base: [
    {
      overflow: "hidden",
      p: "xs",
      pt: "0",
    },
    style({
      selectors: {
        '&[data-state="closed"]': {
          animation: `${slideUp} 300ms ease-out`,
        },
        '&[data-state="open"]': {
          animation: `${slideDown} 300ms ease-out`,
        },
      },
    }),
  ],
});
