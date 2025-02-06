import { theme } from "@optiaxiom/globals";

import * as checkboxStyles from "../card-checkbox/CardCheckbox.css";
import * as coverStyles from "../cover/Cover.css";
import * as linkStyles from "../link/Link.css";
import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const card = recipe({
  base: [
    className,
    {
      border: "1",
      borderColor: "border.tertiary",
      color: "fg.default",
      gap: "12",
      p: "16",
      transition: "transform",
    },
    style({
      vars: {
        [coverStyles.borderRadiusVar]: theme.borderRadius.lg,
      },

      borderRadius: theme.borderRadius.lg,
      position: "relative",

      selectors: {
        [`&:has(
          ${linkStyles.className}[data-overlay]:not([data-disabled]):active,
          ${checkboxStyles.className} input:not([disabled]):active
        )`]: {
          transform: "scale(0.97)",
        },
      },
    }),
  ],
});
