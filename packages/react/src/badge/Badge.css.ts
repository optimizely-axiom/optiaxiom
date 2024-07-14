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
      px: "8",
      py: "2",
      rounded: "md",
    },
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

export type BadgeVariants = NonNullable<RecipeVariants<typeof badge>>;
