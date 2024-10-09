import { theme } from "../theme";
import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const pill = recipe({
  base: [
    {
      bg: "neutral.100",
      border: "0",
      fontSize: "sm",
      rounded: "md",
    },
    style({
      minWidth: "auto",
      position: "relative",
      userSelect: "none",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["gray.300"]}`,
          outlineOffset: "1px",
        },
      },
    }),
  ],
  variants: {
    size: {
      md: {
        h: "xs",
      },
      lg: {
        h: "sm",
      },
    },
  },
});

export type PillVariants = NonNullable<RecipeVariants<typeof pill>>;
