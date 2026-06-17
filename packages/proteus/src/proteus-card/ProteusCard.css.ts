import { theme } from "@optiaxiom/react/css-runtime";

import { cardLinkMarker } from "../proteus-card-link/ProteusCardLink.css";
import { style } from "../vanilla-extract";

export const card = style({
  "@media": {
    "(hover: hover)": {
      selectors: {
        [`&:has(${cardLinkMarker}:hover)`]: {
          borderColor: theme.colors["border.secondary"],
        },
      },
    },
  },
});
