import { theme } from "../styles";
import {
  type RecipeVariants,
  createVar,
  keyframes,
  recipe,
  style,
} from "../vanilla-extract";

const accentColorVar = createVar();
const swipeEndVar = createVar();

const fadeOut = keyframes({
  from: {
    opacity: "1",
  },
});
const slideIn = keyframes({
  from: {
    translate: swipeEndVar,
  },
  to: {
    translate: "0",
  },
});
const swipeOut = keyframes({
  from: {
    opacity: "1",
    translate: "var(--radix-toast-swipe-end-x) var(--radix-toast-swipe-end-y)",
  },
  to: {
    translate: swipeEndVar,
  },
});

export const root = recipe({
  base: [
    {
      alignItems: "center",
      bg: "bg.neutral.inverse",
      color: "fg.default.inverse",
      display: "flex",
      gap: "10",
      maxW: "full",
      p: "16",
      pr: "10",
      rounded: "sm",
      w: ["full", "max"],
    },
    style({
      selectors: {
        '&[data-state="closed"]': {
          animation: `${fadeOut} 100ms ease-in`,
          opacity: "0",
        },
        '&[data-state="closed"] ~ &': {
          transition: "translate 100ms ease-in 100ms",
          translate: "0 -100%",
        },
        '&[data-state="open"]': {
          animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
        },
        '&[data-swipe="cancel"]': {
          transition: "translate 150ms ease",
          translate: "0",
        },
        '&[data-swipe="end"]': {
          animation: `${swipeOut} 100ms ease-out`,
          opacity: "0",
        },
        '&[data-swipe="move"]': {
          translate:
            "var(--radix-toast-swipe-move-x) var(--radix-toast-swipe-move-y)",
        },
        '&[data-swipe-direction="down"]': {
          vars: {
            [swipeEndVar]: "0 calc(100% + 24px)",
          },
        },
        '&[data-swipe-direction="left"]': {
          vars: {
            [swipeEndVar]: "calc(-100% - 24px) 0",
          },
        },
        '&[data-swipe-direction="right"]': {
          vars: {
            [swipeEndVar]: "calc(100% + 24px) 0",
          },
        },
        '&[data-swipe-direction="up"]': {
          vars: {
            [swipeEndVar]: "0 calc(-100% - 24px)",
          },
        },
        '[data-position^="bottom"] &:first-child': {
          marginBottom: "auto",
        },
        '[data-position^="bottom"] &[data-state="closed"] ~ &': {
          translate: "0 100%",
        },
        '[data-position^="top"] &:last-child': {
          marginTop: "auto",
        },
        '[data-position^="top"] &[data-state="closed"] ~ &': {
          translate: "0 -100%",
        },
      },
    }),
  ],
  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [accentColorVar]: theme.colors["red.300"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["fg.default.inverse"],
        },
      }),
      success: style({
        vars: {
          [accentColorVar]: theme.colors["green.400"],
        },
      }),
      warning: style({
        vars: {
          [accentColorVar]: theme.colors["yellow.300"],
        },
      }),
    },
  },
});

export const icon = recipe({
  base: [
    {
      mt: "4",
      size: "16",
    },
    style({
      alignSelf: "start",
      color: accentColorVar,
    }),
  ],
});

export type RootVariants = RecipeVariants<typeof root>;
