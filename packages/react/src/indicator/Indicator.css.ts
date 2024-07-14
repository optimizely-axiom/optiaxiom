import { theme } from "../styles";
import {
  type RecipeVariants,
  createVar,
  recipe,
  style,
} from "../vanilla-extract";

const subtleBackgroundColorVar = createVar();
const subtleColorVar = createVar();
const solidBackgroundColorVar = createVar();
const solidColorVar = createVar();

export const indicator = recipe({
  base: [
    {
      alignItems: "center",
      fontSize: "sm",
      fontWeight: "500",
      justifyContent: "center",
      p: "2",
      rounded: "xl",
    },
    style({
      minHeight: "20px",
      minWidth: "20px",
      position: "absolute",
      zIndex: 1,
    }),
  ],

  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.error.solid"],
          [solidColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.error.subtle"],
          [subtleColorVar]: theme.colors["bg.error.solid.hover"],
        },
      }),
      info: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["blue.600"],
          [solidColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.information"],
          [subtleColorVar]: theme.colors["blue.600"],
        },
      }),
      neutral: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["border.default"],
          [solidColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.default.hover"],
          [subtleColorVar]: theme.colors["fg.secondary"],
        },
      }),
      primary: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.brand.solid"],
          [solidColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.brand.subtle"],
          [subtleColorVar]: theme.colors["brand.700"],
        },
      }),
      success: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.success.solid"],
          [solidColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.success.subtle"],
          [subtleColorVar]: theme.colors["green.700"],
        },
      }),
      warning: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.warning.solid"],
          [solidColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.warning.subtle"],
          [subtleColorVar]: theme.colors["yellow.700"],
        },
      }),
    },
    position: {
      "bottom-left": style({
        bottom: 0,
        left: 0,
        transform: "translate(-50%, 50%)",
      }),
      "bottom-middle": style({
        bottom: 0,
        left: "50%",
        transform: "translate(-50%, 50%)",
      }),
      "bottom-right": style({
        bottom: 0,
        right: 0,
        transform: "translate(50%, 50%)",
      }),
      "left-middle": style({
        left: 0,
        top: "50%",
        transform: "translate(-50%, -50%)",
      }),
      "right-middle": style({
        right: 0,
        top: "50%",
        transform: "translate(50%, -50%)",
      }),
      "top-left": style({
        left: 0,
        top: 0,
        transform: "translate(-50%, -50%)",
      }),
      "top-middle": style({
        left: "50%",
        top: 0,
        transform: "translate(-50%, -50%)",
      }),
      "top-right": style({
        right: 0,
        top: 0,
        transform: "translate(50%, -50%)",
      }),
    },
    variant: {
      solid: style({
        backgroundColor: solidBackgroundColorVar,
        color: solidColorVar,
      }),
      subtle: style({
        backgroundColor: subtleBackgroundColorVar,
        color: subtleColorVar,
      }),
    },
  },
});

export const indicatorContainer = recipe({
  base: style({
    position: "relative",
  }),
});

export type IndicatorVariants = NonNullable<RecipeVariants<typeof indicator>>;
