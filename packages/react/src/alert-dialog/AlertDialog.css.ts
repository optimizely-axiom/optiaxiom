import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    style({
      position: "absolute",
    }),
  ],
  variants: {
    size: {
      sm: style({ width: "375px" }),
      md: style({ width: "600px" }),
      lg: style({ width: "800px" }),
    },
  },
});

export const overlay = recipe({
  base: [
    style({
      position: "absolute",
    }),
  ],
});

export const footer = recipe({
  base: [
    style({
      borderTop: `1px solid ${theme.colors["border.secondary"]}`,
    }),
  ],
});

export type DialogVariants = RecipeVariants<typeof content>;
