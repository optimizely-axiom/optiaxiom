import { theme } from "../styles";
import {
  type RecipeVariants,
  createVar,
  recipe,
  style,
} from "../vanilla-extract";

const bgColorVar = createVar();
const accentColorVar = createVar();

export const item = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      fontSize: "md",
      gap: "xs",
      p: "xs",
      rounded: "sm",
      transition: "colors",
    },
    style({
      cursor: "default",
      position: "relative",
      selectors: {
        "&[data-disabled='true']": {
          color: theme.colors["fg.disabled"],
        },
        "&[data-selected='true']": {
          backgroundColor: bgColorVar,
          color: accentColorVar,
          cursor: "pointer",
        },
      },
      userSelect: "none",
    }),
  ],
  variants: {
    colorScheme: {
      danger: style({
        vars: {
          [accentColorVar]: theme.colors["fg.error"],
          [bgColorVar]: theme.colors["bg.error"],
        },
      }),
      neutral: style({
        vars: {
          [accentColorVar]: theme.colors["fg.default"],
          [bgColorVar]: theme.colors["bg.input.disabled"],
        },
      }),
    },
  },
});

export type ItemVariants = RecipeVariants<typeof item>;
