import { keyframes, recipe, style } from "../vanilla-extract";

const slideDown = keyframes({
  from: {
    height: 0,
    opacity: 0,
    overflowY: "hidden",
  },
  to: {
    height: "var(--radix-collapsible-content-height)",
    overflowY: "hidden",
  },
});

const slideUp = keyframes({
  from: {
    height: "var(--radix-collapsible-content-height)",
    overflowY: "hidden",
  },
  to: {
    height: 0,
    opacity: 0,
    overflowY: "hidden",
  },
});

export const content = recipe({
  base: [
    style({
      selectors: {
        '&[data-state="closed"]': {
          animation: `${slideUp} 300ms ease`,
        },
        '&[data-state="open"]': {
          animation: `${slideDown} 300ms ease`,
        },
      },
    }),
  ],
});
