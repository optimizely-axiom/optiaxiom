import * as overflowStyles from "../card-overflow/CardOverflow.css";
import { recipe, style } from "../vanilla-extract";

export const action = recipe({
  base: [
    style({
      selectors: {
        [`${overflowStyles.className} &`]: {
          inset: "0",
          padding: "16px",
          position: "absolute",
        },
      },
    }),
  ],
});
