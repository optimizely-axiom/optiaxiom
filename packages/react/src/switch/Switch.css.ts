import { theme } from "@optiaxiom/globals";

import * as styles from "../toggle-input/ToggleInput.css";
import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const marker = style({});
const inputMarker = style({});

export const root = recipe({
  base: [
    marker,
    style({
      selectors: {
        [`&:has(${inputMarker}:checked:disabled)`]: {
          vars: {
            [styles.controlAccentVar]: theme.colors["bg.accent"],
            [styles.controlColorVar]: theme.colors["fg.black"],
          },
        },
        [`&:has(${inputMarker}:not(checked):disabled)`]: {
          vars: {
            [styles.controlColorVar]: theme.colors["border.control"],
          },
        },
      },
    }),
  ],
});

const sizeVar = createVar();
const checkedBorderBlockVar = createVar();
const checkedBorderInlineVar = createVar();

export const input = recipe({
  base: inputMarker,
});

export const control = recipe({
  base: [
    {
      display: "grid",
      rounded: "full",
    },
    style({
      vars: {
        [checkedBorderBlockVar]: `calc((4px + ${sizeVar} + 4px) / 2)`,
        [checkedBorderInlineVar]: `calc((4px + ${sizeVar} * 1.5 + 12px + 4px) / 2)`,
      },

      borderColor: styles.controlAccentVar,
      borderWidth: "2px",
      height: `calc(4px + ${sizeVar} + 4px)`,
      placeContent: "center",
      position: "relative",
      transitionDuration: theme.duration.sm,
      transitionProperty: "border-color, border-width",
      transitionTimingFunction: "ease",
      width: `calc(4px + ${sizeVar} * 1.5 + 12px + 4px)`,

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
        [`${marker}:has(${inputMarker}:checked) &::before`]: {
          inset: `calc(-1 * ${checkedBorderBlockVar}) calc(-1 * ${checkedBorderInlineVar})`,
          opacity: 1,
        },
        [`${marker}:has(${inputMarker}:checked) &`]: {
          borderBlockWidth: checkedBorderBlockVar,
          borderInlineWidth: checkedBorderInlineVar,
        },
      },
    }),
  ],
  variants: {
    /**
     * Control the size of the switch.
     */
    size: {
      md: [
        {
          mt: "2",
        },
        style({
          vars: {
            [sizeVar]: "8px",
          },
        }),
      ],
      lg: [
        style({
          vars: {
            [sizeVar]: theme.size["2xs"],
          },
        }),
      ],
    },
  },
});

export const thumb = recipe({
  base: [
    {
      display: "block",
      rounded: "full",
      transition: "all",
    },
    style({
      backgroundColor: styles.controlColorVar,
      height: sizeVar,
      transform: `translateX(calc(-6px - ${sizeVar} / 4))`,
      width: sizeVar,

      selectors: {
        [`${marker}:active &`]: {
          width: `calc(${sizeVar} * 1.25)`,
        },
        [`${marker}:active:has(${inputMarker}:checked) &`]: {
          marginLeft: `calc(${sizeVar} * -0.25)`,
        },
        [`${marker}:active:has(${inputMarker}:not(:checked)) &`]: {
          marginRight: `calc(${sizeVar} * -0.25)`,
        },
        [`${marker}:has(${inputMarker}:checked) &`]: {
          transform: `translateX(calc(6px + ${sizeVar} / 4))`,
        },
        [`${marker}:has(${inputMarker}:not(:disabled)) &`]: {
          boxShadow: theme.boxShadow["sm"],
        },
      },
    }),
  ],
});

export type SwitchVariants = RecipeVariants<typeof control>;
