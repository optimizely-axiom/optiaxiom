import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "white",
      rounded: "lg",
      shadow: "md",
    },
    style({
      maxWidth: "90dvw",
      position: "relative",
    }),
  ],
  variants: {
    size: {
      sm: style({
        width: "375px",
      }),
      md: style({
        width: "600px",
      }),
      lg: style({
        width: "800px",
      }),
    },
  },
});

export const overlay = recipe({
  base: [
    {
      alignItems: "center",
      bg: "dark.200",
      justifyContent: "center",
      size: "full",
    },
    style({
      position: "absolute",
    }),
  ],
});

export const close = recipe({
  base: [
    {
      rounded: "full",
    },
    style({
      position: "absolute",
      right: 24,
      top: 24,
    }),
  ],
});

export type DialogVariants = RecipeVariants<typeof content>;
