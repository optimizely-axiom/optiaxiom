import { theme } from "@optiaxiom/globals";
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
const offsetVar = createVar();

export const cover = recipe({
  variants: {
    inset: {
      false: style({
        vars: {
          [offsetVar]: "1px",
        },
      }),
      true: style({
        vars: {
          [offsetVar]: "-2px",
        },
      }),
    },
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
            "&::before": {
              borderRadius: fallbackVar(borderRadiusVar, "inherit"),
              content: "",
              inset: "0",
              position: "absolute",
            },
            "&:focus-visible::before": {
              outline: `2px auto ${theme.colors["border.focus"]}`,
              outlineOffset: offsetVar,
            },
          },
        }),
      ],
    },
  },
});

export type CoverVariants = RecipeVariants<typeof cover>;
