import { theme } from "../theme";
import {
  type RecipeVariants,
  createVar,
  recipe,
  style,
} from "../vanilla-extract";

const solidColorVar = createVar();
const lightColorVar = createVar();
const iconColorVar = createVar();

export const alert = recipe({
  base: [
    {
      alignItems: "start",
      flexDirection: "row",
      fontSize: "md",
      gap: "xs",
      justifyContent: "space-between",
      p: "md",
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
      info: style({
        vars: {
          [lightColorVar]: theme.colors["brand.50"],
          [solidColorVar]: theme.colors["brand.200"],
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
      light: [
        {
          rounded: "md",
        },
        style({
          backgroundColor: lightColorVar,
        }),
      ],
      solid: style({
        backgroundColor: solidColorVar,
      }),
    },
  },
});

export const icon = recipe({
  base: [
    {
      h: "16",
      mt: "4",
      w: "auto",
    },
  ],
  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [iconColorVar]: theme.colors["bg.error.solid.hover"],
        },
      }),
      info: style({
        vars: {
          [iconColorVar]: theme.colors["brand.600"],
        },
      }),
      neutral: style({
        vars: {
          [iconColorVar]: theme.colors["fg.tertiary"],
        },
      }),
      success: style({
        vars: {
          [iconColorVar]: theme.colors["bg.success.solid.hover"],
        },
      }),
      warning: style({
        vars: {
          [iconColorVar]: theme.colors["bg.warning.solid.hover"],
        },
      }),
    },
    variant: {
      light: style({
        color: iconColorVar,
      }),
      solid: style({
        color: theme.colors["bg.neutral.inverse"],
      }),
    },
  },
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
