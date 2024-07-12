import { theme } from "../styles";
import {
  type RecipeVariants,
  createVar,
  recipe,
  style,
} from "../vanilla-extract";

const subtleBackgroundColorVar = createVar();
const subtleColorVar = createVar();
const accentBackgroundColorVar = createVar();
const accentColorVar = createVar();

export const indicator = recipe({
  base: [
    {
      alignItems: "center",
      fontSize: "sm",
      fontWeight: "500",
      justifyContent: "center",
      p: "2",
      rounded: "lg",
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
          [accentBackgroundColorVar]: theme.colors["bg.error.solid"],
          [accentColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.error.subtle"],
          [subtleColorVar]: theme.colors["bg.error.solid.hover"],
        },
      }),
      info: style({
        vars: {
          [accentBackgroundColorVar]: theme.colors["blue.600"],
          [accentColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.information"],
          [subtleColorVar]: theme.colors["blue.600"],
        },
      }),
      neutral: style({
        vars: {
          [accentBackgroundColorVar]: theme.colors["border.default"],
          [accentColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.default.hover"],
          [subtleColorVar]: theme.colors["fg.secondary"],
        },
      }),
      primary: style({
        vars: {
          [accentBackgroundColorVar]: theme.colors["bg.brand.solid"],
          [accentColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.brand.subtle"],
          [subtleColorVar]: theme.colors["brand.700"],
        },
      }),
      success: style({
        vars: {
          [accentBackgroundColorVar]: theme.colors["bg.success.solid"],
          [accentColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.success.subtle"],
          [subtleColorVar]: theme.colors["green.700"],
        },
      }),
      warning: style({
        vars: {
          [accentBackgroundColorVar]: theme.colors["bg.warning.solid"],
          [accentColorVar]: theme.colors["fg.default"],
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
      accent: style({
        backgroundColor: accentBackgroundColorVar,
        color: accentColorVar,
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
