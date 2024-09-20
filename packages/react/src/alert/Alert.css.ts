import { theme } from "../theme";
import {
  type RecipeVariants,
  createVar,
  recipe,
  style,
} from "../vanilla-extract";

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
        backgroundColor: theme.colors["red.100"],
      }),
      information: style({
        backgroundColor: theme.colors["brand.50"],
      }),
      neutral: style({
        backgroundColor: theme.colors["bg.neutral"],
      }),
      success: style({
        backgroundColor: theme.colors["green.100"],
      }),
      warning: style({
        backgroundColor: theme.colors["yellow.100"],
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
    style({
      color: iconColorVar,
    }),
  ],

  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [iconColorVar]: theme.colors["bg.error.solid.hover"],
        },
      }),
      information: style({
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
  },
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
