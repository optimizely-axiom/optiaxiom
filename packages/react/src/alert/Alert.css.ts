import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const alert = recipe({
  base: [
    {
      alignItems: "center",
      flexDirection: "row",
      gap: "10",
      justifyContent: "space-between",
      py: "md",
      rounded: "md",
    },
    style({
      maxWidth: "90dvw",
    }),
  ],
  variants: {
    size: {
      md: style({ width: "380px" }),
      lg: style({ width: "640px" }),
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
      rounded: "sm",
      size: "sm",
    },
    style({
      cursor: "pointer",
      marginRight: "14px",
    }),
  ],
});

export const content = recipe({
  base: [
    {
      flex: "auto",
      gap: "xs",
    },
  ],
});

export const startDecorator = recipe({
  base: [
    {
      flex: "none",
      h: "xs",
      w: "16",
    },
  ],
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
