import { theme } from "@optiaxiom/globals";

import { keyframes, recipe, style } from "../vanilla-extract";

const fadeIn = keyframes({
  from: { opacity: "0" },
});
const fadeOut = keyframes({
  to: { opacity: "0" },
});

export const overlay = recipe({
  base: [
    style({
      selectors: {
        "&[data-dnd-dragging]": {
          animation: `${fadeIn} ${theme.duration.md}`,
        },
        "&[data-dnd-dropping]": {
          animation: `${fadeOut} ${theme.duration.md}`,
        },
      },
    }),
  ],
});
