import { theme } from "../theme";
import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const subtleBackgroundColorVar = createVar();
const subtleColorVar = createVar();
const solidBackgroundColorVar = createVar();
const solidColorVar = createVar();

export const badge = recipe({
  base: [
    {
      display: "inline-flex",
      fontSize: "sm",
      fontWeight: "500",
      justifyContent: "center",
      px: "xs",
      py: "2",
      rounded: "full",
    },
    style({
      vars: {
        [solidColorVar]: theme.colors["fg.default.inverse"],
      },
    }),
  ],
  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.error.strong"],
          [subtleBackgroundColorVar]: theme.colors["bg.error"],
          [subtleColorVar]: theme.colors["fg.error.strong"],
        },
      }),
      information: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.information.strong"],
          [subtleBackgroundColorVar]: theme.colors["bg.information"],
          [subtleColorVar]: theme.colors["fg.information.strong"],
        },
      }),
      neutral: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.tertiary"],
          [solidColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.neutral"],
          [subtleColorVar]: theme.colors["fg.secondary"],
        },
      }),
      primary: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.accent.strong"],
          [subtleBackgroundColorVar]: theme.colors["bg.accent"],
          [subtleColorVar]: theme.colors["fg.accent.strong"],
        },
      }),
      success: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.success.strong"],
          [subtleBackgroundColorVar]: theme.colors["bg.success"],
          [subtleColorVar]: theme.colors["fg.success.strong"],
        },
      }),
      warning: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.warning.strong"],
          [solidColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.warning"],
          [subtleColorVar]: theme.colors["fg.warning.strong"],
        },
      }),
    },
    variant: {
      light: style({
        backgroundColor: subtleBackgroundColorVar,
        color: subtleColorVar,
      }),
      solid: style({
        backgroundColor: solidBackgroundColorVar,
        color: solidColorVar,
      }),
    },
  },
});

export type BadgeVariants = NonNullable<RecipeVariants<typeof badge>>;
