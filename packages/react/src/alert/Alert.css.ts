import { recipe, type RecipeVariants } from "../vanilla-extract";

export const alert = recipe({
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
      danger: {
        bg: "red.100",
      },
      information: {
        bg: "brand.50",
      },
      neutral: {
        bg: "bg.neutral",
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
        color: "bg.error.solid.hover",
      },
      information: {
        color: "brand.600",
      },
      neutral: {
        color: "fg.tertiary",
      },
      success: {
        color: "bg.success.solid.hover",
      },
      warning: {
        color: "bg.warning.solid.hover",
      },
    },
  },
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
