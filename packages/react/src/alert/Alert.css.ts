import { theme } from "../styles";
import {
  type RecipeVariants,
  createVar,
  recipe,
  style,
} from "../vanilla-extract";

const solidColorVar = createVar();
const lightColorVar = createVar();

export const alert = recipe({
  base: [
    {
      alignItems: "start",
      flexDirection: "row",
      fontSize: "md",
      justifyContent: "space-between",
      p: "md",
      rounded: "md",
    },
  ],
  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [lightColorVar]: theme.colors["red.100"],
          [solidColorVar]: theme.colors["red.200"],
        },
      }),
      neutral: style({
        vars: {
          [lightColorVar]: theme.colors["bg.neutral"],
          [solidColorVar]: theme.colors["bg.neutral.solid"],
        },
      }),
      success: style({
        vars: {
          [lightColorVar]: theme.colors["green.100"],
          [solidColorVar]: theme.colors["green.200"],
        },
      }),
      warning: style({
        vars: {
          [lightColorVar]: theme.colors["yellow.100"],
          [solidColorVar]: theme.colors["yellow.200"],
        },
      }),
    },
    variant: {
      light: style({
        backgroundColor: lightColorVar,
      }),
      solid: style({
        backgroundColor: solidColorVar,
      }),
    },
  },
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
