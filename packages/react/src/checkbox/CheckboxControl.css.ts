import { theme } from "@optiaxiom/globals";

import * as rootStyles from "../toggle-input/ToggleInput.css";
import * as inputStyles from "../toggle-input/ToggleInputHiddenInput.css";
import { rem } from "../utils";
import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const sizeVar = createVar();

export const icon = recipe({
  base: [
    {
      transition: "all",
    },
    style({
      clipPath: "inset(100% 0 0 0)",
      transitionDelay: `calc(0.8 * ${theme.duration.sm})`,

      selectors: {
        [`${rootStyles.className}:has(${inputStyles.className}:checked, ${inputStyles.className}:indeterminate) &`]:
          {
            clipPath: "inset(0 0 0 0)",
          },
      },
    }),
  ],
});

export const control = recipe({
  base: [
    {
      display: "grid",
    },
    style({
      backgroundColor: theme.colors["bg.default"],
      borderColor: rootStyles.controlAccentVar,
      borderWidth: "2px",
      color: rootStyles.controlColorVar,
      height: sizeVar,
      placeContent: "center",
      position: "relative",
      transitionDuration: theme.duration.sm,
      transitionProperty: "border-color, border-width",
      transitionTimingFunction: "ease",
      width: sizeVar,

      selectors: {
        "&::before": {
          border: `1px solid ${theme.colors["border.disabled"]}`,
          borderRadius: "inherit",
          content: "",
          inset: "-2px",
          opacity: 0,
          pointerEvents: "none",
          position: "absolute",
          transitionDuration: theme.duration.sm,
          transitionProperty: "inset, opacity",
          transitionTimingFunction: "ease",
        },
        [`${rootStyles.className}:has(${inputStyles.className}:checked, ${inputStyles.className}:indeterminate) &::before`]:
          {
            inset: `calc(-1 * ${sizeVar} / 2)`,
            opacity: 1,
          },
        [`${rootStyles.className}:has(${inputStyles.className}:checked, ${inputStyles.className}:indeterminate) &`]:
          {
            borderWidth: `calc(${sizeVar} / 2)`,
          },
      },
    }),
  ],

  variants: {
    shift: {
      false: {},
      true: style({
        marginBlock: rem("-2px"),
      }),
    },
    /**
     * Control the size of the checkbox.
     */
    size: {
      sm: [
        {
          rounded: "sm",
        },
        style({
          vars: {
            [sizeVar]: theme.size.xs,
          },
        }),
      ],
      md: [
        {
          rounded: "md",
        },
        style({
          vars: {
            [sizeVar]: theme.size.sm,
          },
        }),
      ],
    },
  },
});

export const indicator = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      p: "2",
      size: "full",
    },
  ],
});

export type CheckboxControlVariants = RecipeVariants<typeof control>;
