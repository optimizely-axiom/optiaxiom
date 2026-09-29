import { theme } from "@optiaxiom/globals";

import * as styles from "../toggle-input/ToggleInput.css";
import { rem } from "../utils";
import { recipe, style } from "../vanilla-extract";

const marker = style({});
const inputMarker = style({});

export const radio = recipe({
  base: marker,
});

export const input = recipe({
  base: inputMarker,
});

export const control = recipe({
  base: [
    {
      bg: "bg.default",
      display: "grid",
      rounded: "full",
      size: "sm",
    },
    style({
      borderColor: styles.controlAccentVar,
      borderWidth: "2px",
      placeContent: "center",
      position: "relative",
      transitionDuration: theme.duration.sm,
      transitionProperty: "border-color, border-width",
      transitionTimingFunction: "ease",

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
          inset: rem("-12px"),
          opacity: 1,
        },
        [`${marker}:has(${inputMarker}:checked) &`]: {
          borderWidth: rem("12px"),
        },
      },
    }),
  ],

  variants: {
    shift: {
      false: {},
      true: style({
        marginTop: rem("-2px"),
      }),
    },
  },
});

export const indicator = recipe({
  base: [
    {
      rounded: "inherit",
      transition: "transform",
    },
    style({
      backgroundColor: styles.controlColorVar,
      height: rem("8px"),
      transform: "scale(0)",
      width: rem("8px"),

      selectors: {
        [`${marker}:has(${inputMarker}:checked) &`]: {
          transform: "scale(1)",
        },
      },
    }),
  ],
});
