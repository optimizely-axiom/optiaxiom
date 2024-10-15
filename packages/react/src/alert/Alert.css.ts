import { recipe, type RecipeVariants } from "../vanilla-extract";

export const alert = recipe({
  base: [
    {
      alignItems: "start",
      color: "fg.default",
      flexDirection: "row",
      fontSize: "md",
      fontWeight: "500",
      gap: "xs",
      justifyContent: "space-between",
      p: "sm",
      pr: "md",
      rounded: "md",
    },
  ],
  variants: {
    colorScheme: {
      danger: {
        bg: "red.100",
      },
      information: {
        bg: "brand.50",
      },
      neutral: {
        bg: "bg.secondary",
      },
      success: {
        bg: "green.100",
      },
      warning: {
        bg: "yellow.100",
      },
    },
  },
});

export const icon = recipe({
  base: [
    {
      h: "16",
      mt: "4",
      w: "auto",
    },
  ],

  variants: {
    colorScheme: {
      danger: {
        color: "fg.error.strong",
      },
      information: {
        color: "brand.600",
      },
      neutral: {
        color: "fg.tertiary",
      },
      success: {
        color: "fg.success.strong",
      },
      warning: {
        color: "fg.warning.strong",
      },
    },
  },
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
