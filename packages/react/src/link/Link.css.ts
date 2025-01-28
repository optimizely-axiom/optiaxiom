import { theme as linkStyles } from "@optiaxiom/globals";

import {
  createVar,
  fallbackVar,
  type RecipeVariants,
  style,
} from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const borderRadiusVar = createVar();
export const className = style({});

export const link = recipe({
  base: [
    className,
    style({
      position: "relative",
      textDecoration: "none",

      "@media": {
        "(hover: hover)": {
          selectors: {
            "&:hover:not([data-disabled])": {
              textDecoration: "underline",
            },
          },
        },
      },

      selectors: {
        "&:focus-visible": {
          outline: `2px auto ${linkStyles.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        "&:visited": {
          color: linkStyles.colors["fg.link.visited"],
        },
        "&[data-disabled]": {
          color: linkStyles.colors["fg.disabled"],
        },
      },
    }),
  ],
  variants: {
    /**
     * Control the appearance by selecting between the different link types.
     */
    appearance: {
      default: style({
        color: linkStyles.colors["fg.link.default"],

        "@media": {
          "(hover: hover)": {
            selectors: {
              "&:hover:not([data-disabled])": {
                color: linkStyles.colors["fg.link.default.hovered"],
              },
            },
          },
        },
      }),
      inverse: style({
        color: linkStyles.colors["fg.link.inverse"],
      }),
      subtle: style({
        color: linkStyles.colors["fg.link.subtle"],

        selectors: {
          "&:visited": {
            color: linkStyles.colors["fg.link.subtle"],
          },
        },
      }),
    },
    /**
     * Whether to expand and fill up the whole area of the parent which has `position: relative`.
     */
    overlay: {
      false: {},
      true: style({
        position: "static",

        selectors: {
          "&::after": {
            borderRadius: fallbackVar(borderRadiusVar, "inherit"),
            content: "",
            inset: "0",
            position: "absolute",
          },
          "&:focus-visible": {
            outline: "none",
          },
          "&:focus-visible::after": {
            outline: `2px auto ${linkStyles.colors["border.focus"]}`,
            outlineOffset: "1px",
          },
        },
      }),
    },
  },
});

export const icon = recipe({
  base: [
    {
      display: "inline-flex",
      ml: "4",
    },
    style({
      height: "auto",
      width: "0.875em",
    }),
  ],
});

export type LinkVariants = RecipeVariants<typeof link>;
