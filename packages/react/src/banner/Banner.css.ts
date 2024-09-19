import { theme } from "../theme";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const banner = recipe({
  base: [
    {
      alignItems: "start",
      flexDirection: "row",
      fontSize: "md",
      gap: "xs",
      justifyContent: "space-between",
      p: "md",
    },
  ],
  variants: {
    colorScheme: {
      danger: style({
        backgroundColor: theme.colors["red.200"],
      }),
      info: style({
        backgroundColor: theme.colors["brand.200"],
      }),
      note: style({
        backgroundColor: theme.colors["bg.neutral.solid"],
      }),
      success: style({
        backgroundColor: theme.colors["green.200"],
      }),
      warning: style({
        backgroundColor: theme.colors["yellow.200"],
      }),
    },
  },
});

export const icon = recipe({
  base: [
    {
      color: "bg.neutral.inverse",
      h: "16",
      mt: "4",
      w: "auto",
    },
  ],
});

export type BannerVariants = NonNullable<RecipeVariants<typeof banner>>;
