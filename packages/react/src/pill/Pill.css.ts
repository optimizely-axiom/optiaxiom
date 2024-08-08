import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const pill = recipe({
  base: [
    {
      alignItems: "center",
      display: "inline-flex",
      flexDirection: "row",
      fontSize: "sm",
      gap: "4",
      justifyContent: "center",
      px: "6",
      py: "2",
      rounded: "md",
    },
    style({
      backgroundColor: theme.colors["neutral.100"],
      color: theme.colors["fg.default"],
      position: "relative",
      userSelect: "none",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["gray.300"]}`,
          outlineOffset: "1px",
        },
        "&[data-readonly]": {
          border: `1px solid ${theme.colors["border.disabled"]}`,
          color: theme.colors["fg.secondary"],
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

export const button = recipe({
  base: [
    {
      h: "16",
      w: "16",
    },
  ],
});
export const icon = recipe({
  base: [
    style({
      flexShrink: "0",
    }),
  ],
});
export type PillVariants = NonNullable<RecipeVariants<typeof pill>>;
