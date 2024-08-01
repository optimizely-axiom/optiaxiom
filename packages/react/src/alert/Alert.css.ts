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
      gap: "xs",
      pl: "md",
      py: "md",
      rounded: "md",
    },
    style({
      maxWidth: "90dvw",
    }),
  ],
  variants: {
    size: {
      md: style({
        width: "380px",
      }),
      lg: style({
        width: "640px",
      }),
    },
    type: {
      danger: style({
        vars: {
          [lightColorVar]: theme.colors["red.100"],
          [solidColorVar]: theme.colors["red.200"],
        },
      }),
      info: style({
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

export const close = recipe({
  base: [
    {
      px: "2",
      py: "4",
      rounded: "sm",
      size: "sm",
    },
    style({
      cursor: "pointer",
      gridArea: "close",
      marginRight: "14px",
    }),
  ],
});

export const content = recipe({
  base: [
    {
      flex: "1",
      flexDirection: "column",
      gap: "xs",
      mt: "2",
      overflow: "hidden",
    },
  ],
  variants: {
    size: {
      md: style({ minWidth: "288px" }),
      lg: style({ minWidth: "540px" }),
    },
  },
});

export const startDecorator = recipe({
  base: [
    {
      flex: "none",
      mt: "2",
      size: "xs",
    },
  ],
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
