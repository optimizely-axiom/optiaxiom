import { theme } from "@optiaxiom/globals";

import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

export const subtleBackgroundColorVar = createVar();
const subtleColorVar = createVar();
export const solidBackgroundColorVar = createVar();
const solidColorVar = createVar();

export const badge = recipe({
  base: [
    {
      display: "inline-flex",
      flex: "none",
      fontSize: "sm",
      fontWeight: "400",
      fontFamily: "mono",
      textTransform: "uppercase",
      justifyContent: "center",
      px: "6",
      py: "2",
      rounded: "full",
    },
    style({
      vars: {
        [solidColorVar]: theme.colors["fg.white"],
      },

      userSelect: "none",

      selectors: {
        "&:not(:empty)": {
          minWidth: theme.size["xs"],
        },
      },
    }),
  ],
  variants: {
    /**
     * Control the appearance by selecting between the different badge types.
     */
    intent: {
      danger: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.error"],
          [subtleBackgroundColorVar]: theme.colors["bg.error.subtle"],
          [subtleColorVar]: theme.colors["fg.error.strong"],
        },
      }),
      information: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.information"],
          [subtleBackgroundColorVar]: theme.colors["bg.information.subtle"],
          [subtleColorVar]: theme.colors["fg.information.strong"],
        },
      }),
      neutral: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.tertiary"],
          [solidColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.secondary"],
          [subtleColorVar]: theme.colors["fg.secondary"],
        },
      }),
      primary: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.default.inverse"],
          [solidColorVar]: theme.colors["fg.default.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.default.inverse"],
          [subtleColorVar]: theme.colors["fg.default.inverse"],
        },
      }),
      success: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.success"],
          [solidColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.success.subtle"],
          [subtleColorVar]: theme.colors["fg.success.strong"],
        },
      }),
      warning: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.warning"],
          [solidColorVar]: theme.colors["fg.warning.inverse"],
          [subtleBackgroundColorVar]: theme.colors["bg.warning.subtle"],
          [subtleColorVar]: theme.colors["fg.warning.strong"],
        },
      }),
    },
    /**
     * Control the style of the badge.
     */
    variant: {
      strong: style({
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

export type BadgeVariants = RecipeVariants<typeof badge>;
