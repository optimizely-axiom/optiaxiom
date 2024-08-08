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

export const badge = recipe({
  base: [
    {
      display: "inline-flex",
      fontSize: "sm",
      fontWeight: "500",
      justifyContent: "center",
      leading: "none",
      rounded: "full",
    },
    style({
      vars: {
        [solidColorVar]: theme.colors["fg.default.inverse"],
      },

      padding: "4px 8px",
    }),
  ],
  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.error.solid"],
          [subtleBackgroundColorVar]: theme.colors["bg.error"],
          [subtleColorVar]: theme.colors["fg.error"],
        },
      }),
      information: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.information.solid"],
          [subtleBackgroundColorVar]: theme.colors["bg.information"],
          [subtleColorVar]: theme.colors["fg.information"],
        },
      }),
      neutral: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.neutral.solid"],
          [solidColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.neutral"],
          [subtleColorVar]: theme.colors["fg.secondary"],
        },
      }),
      primary: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.brand.solid"],
          [subtleBackgroundColorVar]: theme.colors["bg.brand"],
          [subtleColorVar]: theme.colors["fg.brand"],
        },
      }),
      success: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.success.solid"],
          [subtleBackgroundColorVar]: theme.colors["bg.success"],
          [subtleColorVar]: theme.colors["fg.success"],
        },
      }),
      warning: style({
        vars: {
          [solidBackgroundColorVar]: theme.colors["bg.warning.solid"],
          [solidColorVar]: theme.colors["fg.default"],
          [subtleBackgroundColorVar]: theme.colors["bg.warning"],
          [subtleColorVar]: theme.colors["fg.warning"],
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
