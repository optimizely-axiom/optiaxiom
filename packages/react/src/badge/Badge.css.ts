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

export const badge = recipe({
  base: [
    {
      alignItems: "center",
      fontWeight: "500",
      justifyContent: "center",
      px: "8",
      py: "2",
      rounded: "sm",
    },
    style({
      textTransform: "capitalize",
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

export type BadgeVariants = NonNullable<RecipeVariants<typeof badge>>;
