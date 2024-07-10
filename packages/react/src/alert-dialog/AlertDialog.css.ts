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
      sm: style({ maxWidth: "375px", minWidth: "375px" }),
      md: style({ maxWidth: "600px", minWidth: "600px" }),
      lg: style({ maxWidth: "800px", minWidth: "800px" }),
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
      borderTop: "1px",

      borderColor: theme.colors["border.secondary"],
      borderStyle: "solid",
    }),
  ],
});

export type DialogVariants = RecipeVariants<typeof content>;
