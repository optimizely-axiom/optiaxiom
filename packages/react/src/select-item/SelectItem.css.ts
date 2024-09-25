import { theme } from "../theme";
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
    style({
      color: theme.colors["fg.default"],
      outline: "none",
      userSelect: "none",

      selectors: {
        "&:focus-visible": {
          outline: "2px solid transparent",
        },
        "&:not([data-disabled])": {
          color: accentColorVar,
          cursor: "pointer",
        },
        "&:not([data-disabled])[data-highlighted]": {
          backgroundColor: bgColorVar,
        },
        "&:not([data-disabled])[data-highlighted]:active": {
          backgroundColor: theme.colors["neutral.1200/12"],
        },
        "&[data-disabled]": {
          color: theme.colors["fg.disabled"],
        },
      },
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
