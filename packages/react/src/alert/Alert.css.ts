import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const alert = recipe({
  base: [
    {
      display: "grid",
      gap: "xs",
      pl: "md",
      py: "md",
      rounded: "md",
    },
    style({
      gridTemplateAreas: '"start content close"',
      gridTemplateColumns: "auto 1fr auto",
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
        backgroundColor: theme.colors["bg.error.solid"],
        color: "white",
      }),
      info: style({
        backgroundColor: theme.colors["fg.tertiary"],
        color: "white",
      }),
      success: style({
        backgroundColor: theme.colors["bg.success.solid.hover"],
        color: "white",
      }),
      warning: style({
        backgroundColor: theme.colors["yellow.400"],
        color: "black",
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
      display: "flex",
      flexDirection: "column",
      gap: "xs",
      overflow: "hidden",
    },
    style({
      gridArea: "content",
    }),
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
    style({
      alignSelf: "start",
      gridArea: "start",
    }),
  ],
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
