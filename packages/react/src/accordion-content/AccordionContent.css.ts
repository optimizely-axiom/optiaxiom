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
export const wrapper = recipe({
  base: [
    {
      overflow: "visible",
      w: "320",
    },
    style({
      minWidth: "var(--radix-accordion-content-width)",
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
