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
const styleVar = createVar();

export const cover = recipe({
  variants: {
    /**
     * Whether to expand and fill up the whole area of the parent which has `position: relative`.
     */
    disabled: {
      false: [
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
          vars: {
            [styleVar]: "solid",
          },

          selectors: {
            "&::before": {
              borderRadius: fallbackVar(borderRadiusVar, "inherit"),
              content: "",
              inset: "0",
              position: "absolute",
            },
            "&:focus-visible::before": {
              outline: `2px ${styleVar} ${theme.colors["border.focus"]}`,
              outlineOffset: offsetVar,
            },
          },
        }),
      ],
      true: {},
    },
    /**
     * Whether to offset the outline or not.
     */
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

        selectors: {
          "&:is(a)": {
            vars: {
              [styleVar]: "auto",
            },
          },
        },
      }),
    },
  },
});

export type CoverVariants = RecipeVariants<typeof cover>;
