import { keyframes, recipe, style } from "../vanilla-extract";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

export const content = recipe({
  base: [
    {
      alignItems: "center",
      bg: "white",
      color: "black",
      flexDirection: "column",
      gap: "4",
      px: "16",
      py: "16",
      shadow: "xl",
    },
    style({
      border: "1px solid #EBEBEF",
      borderRadius: "3px",

      animationDuration: "400ms",
      animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "transform, opacity",

      selectors: {
        '&[data-state="open"]&[data-side="bottom"]': {
          animationName: slideUpAndFade,
        },
        '&[data-state="open"]&[data-side="left"]': {
          animationName: slideRightAndFade,
        },
        '&[data-state="open"]&[data-side="right"]': {
          animationName: slideLeftAndFade,
        },
        '&[data-state="open"]&[data-side="top"]': {
          animationName: slideDownAndFade,
        },
      },
    }),
  ],
});

export const close = recipe({
  base: [
    {
      rounded: "full",
    },
    style({
      position: "absolute",
      right: 2,
      top: 2,
    }),
  ],
});
