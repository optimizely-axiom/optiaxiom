import { theme as coverStyles } from "@optiaxiom/globals";
import { style as veStyle } from "@vanilla-extract/css";

import { layers } from "../layers";
import {
  createVar,
  fallbackVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

export const borderRadiusVar = createVar();

export const cover = recipe({
  variants: {
    /**
     * Whether to expand and fill up the whole area of the parent which has `position: relative`.
     */
    overlay: {
      false: {},
      true: [
        veStyle({
          "@layer": {
            [layers.axiom]: {
              position: "static",

              selectors: {
                "&:focus-visible": {
                  outline: "none",
                },
              },
            },
          },
        }),
        style({
          selectors: {
            "&::after": {
              borderRadius: fallbackVar(borderRadiusVar, "inherit"),
              content: "",
              inset: "0",
              position: "absolute",
            },
            "&:focus-visible::after": {
              outline: `2px auto ${coverStyles.colors["border.focus"]}`,
              outlineOffset: "1px",
            },
          },
        }),
      ],
    },
  },
});

export type CoverVariants = RecipeVariants<typeof cover>;
