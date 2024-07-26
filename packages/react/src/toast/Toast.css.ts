import { theme } from "../styles";
import {
  type RecipeVariants,
  createVar,
  recipe,
  style,
} from "../vanilla-extract";

const accentColorVar = createVar();

export const root = recipe({
  base: [
    {
      alignItems: "center",
      borderL: "4",
      display: "flex",
      gap: "10",
      p: "16",
      pr: "10",
      rounded: "sm",
    },
    style({
      borderColor: accentColorVar,
    }),
  ],
  variants: {
    type: {
      brand: style({
        vars: {
          [accentColorVar]: theme.colors["border.brand"],
        },
      }),
      danger: style({
        vars: {
          [accentColorVar]: theme.colors["border.error"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["border.active"],
        },
      }),
      success: style({
        vars: {
          [accentColorVar]: theme.colors["border.success"],
        },
      }),
      warning: style({
        vars: {
          [accentColorVar]: theme.colors["border.warning"],
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
