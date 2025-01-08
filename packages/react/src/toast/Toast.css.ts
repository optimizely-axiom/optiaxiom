import { theme } from "@optiaxiom/globals";

import * as styles from "../toast-provider/ToastProvider.css";
import {
  createVar,
  fallbackVar,
  globalStyle,
  keyframes,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const accentColorVar = createVar();

const swipeEndXVar = createVar();
const swipeEndYVar = createVar();

const translateXVar = createVar();
const translateYVar = createVar();

const slideIn = keyframes({
  from: {
    opacity: "0",
    translate: `
      ${fallbackVar(swipeEndXVar, "0")}
      ${fallbackVar(swipeEndYVar, "0")}
    `,
  },
});

const marker = style({});

export const root = recipe({
  base: [
    marker,
    {
      alignItems: "center",
      bg: "bg.default.inverse",
      color: "fg.default.inverse",
      display: "flex",
      gap: "8",
      maxW: "full",
      p: "12",
      pl: "16",
      rounded: "md",
      shadow: "md",
      w: ["full", "max"],
    },
    style({
      vars: {
        [translateXVar]: "0",
        [translateYVar]: "0",
      },

      animationDuration: "300ms",
      animationTimingFunction: "ease",
      transitionDuration: "300ms",
      transitionProperty: "opacity",
      transitionTimingFunction: "ease",
      translate: `${translateXVar} ${translateYVar}`,

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        '&[data-state="closed"]': {
          opacity: "0",
        },
        '&[data-state="closed"] ~ &': {
          transitionProperty: "opacity, translate",
        },
        '&[data-state="open"]': {
          animationName: slideIn,
        },
        '&[data-swipe-direction="down"]': {
          vars: {
            [swipeEndYVar]: `calc(100% + ${styles.padding}px)`,
          },
        },
        '&[data-swipe-direction="left"]': {
          vars: {
            [swipeEndXVar]: `calc(-100% - ${styles.padding}px)`,
          },
        },
        '&[data-swipe-direction="right"]': {
          vars: {
            [swipeEndXVar]: `calc(100% + ${styles.padding}px)`,
          },
        },
        '&[data-swipe-direction="up"]': {
          vars: {
            [swipeEndYVar]: `calc(-100% - ${styles.padding}px)`,
          },
        },
        '&[data-swipe="end"]': {
          vars: {
            [translateXVar]: fallbackVar(swipeEndXVar, "0"),
            [translateYVar]: fallbackVar(swipeEndYVar, "0"),
          },

          transitionProperty: "opacity, translate",
        },
        '&[data-swipe="move"]': {
          vars: {
            [translateXVar]: "var(--radix-toast-swipe-move-x)",
            [translateYVar]: "var(--radix-toast-swipe-move-y)",
          },
        },
        '[data-position^="bottom"] &:first-child': {
          marginBottom: "auto",
        },
        '[data-position^="bottom"] &[data-state="closed"] ~ &': {
          vars: {
            [translateYVar]: `calc(100% + ${styles.gap}px)`,
          },
        },
        '[data-position^="top"] &:last-child': {
          marginTop: "auto",
        },
        '[data-position^="top"] &[data-state="closed"] ~ &': {
          vars: {
            [translateYVar]: `0 calc(-100% - ${styles.gap}px)`,
          },
        },
      },
    }),
  ],
  variants: {
    intent: {
      danger: style({
        vars: {
          [accentColorVar]: theme.colors["fg.error.light"],
        },
      }),
      information: style({
        vars: {
          [accentColorVar]: theme.colors["fg.information.light"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["fg.default.inverse"],
        },
      }),
      success: style({
        vars: {
          [accentColorVar]: theme.colors["fg.success.light"],
        },
      }),
      warning: style({
        vars: {
          [accentColorVar]: theme.colors["fg.warning.light"],
        },
      }),
    },
  },
});

export const icon = recipe({
  base: [
    {
      alignSelf: "start",
      mt: "4",
    },
    style({
      color: accentColorVar,
    }),
  ],
});

globalStyle(`${marker} a`, {
  color: theme.colors["fg.link.inverse"],
  textDecoration: "underline",
});

export type RootVariants = RecipeVariants<typeof root>;
