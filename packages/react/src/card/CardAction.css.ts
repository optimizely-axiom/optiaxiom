import { recipe, style } from "../vanilla-extract";
import * as overflowStyles from "./CardOverflow.css";

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
