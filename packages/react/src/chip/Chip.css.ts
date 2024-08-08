import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const chip = recipe({
  base: [
    {
      rounded: "full",
    },
    style({
      selectors: {
        "&:hover:not([data-disabled])": {
          backgroundColor: theme.colors["gray.600"],
          color: theme.colors["white"],
        },
        "&[data-disabled]": {
          border: `1px solid ${theme.colors["border.disabled"]}`,
          color: theme.colors["fg.disabled"],
        },
        '&[data-state="on"]': {
          backgroundColor: theme.colors["gray.600"],
          color: theme.colors["white"],
        },
      },
    }),
  ],
  variants: {
    size: {
      sm: {
        fontSize: "sm",
        px: "sm",
        py: "2",
      },
      md: {
        fontSize: "md",
        px: "sm",
        py: "4",
      },
      lg: {
        fontSize: "lg",
        px: "md",
        py: "6",
      },
    },
  },
});

export type ChipVariants = NonNullable<RecipeVariants<typeof chip>>;
