import { recipe, type RecipeVariants } from "../vanilla-extract";

export const banner = recipe({
  base: [
    {
      alignItems: "start",
      color: "fg.default",
      flexDirection: "row",
      fontSize: "md",
      fontWeight: "500",
      gap: "sm",
      justifyContent: "space-between",
      px: "lg",
      py: "sm",
    },
  ],
  variants: {
    intent: {
      danger: {
        bg: "bg.error.light",
      },
      information: {
        bg: "bg.information.light",
      },
      neutral: {
        bg: "bg.tertiary",
      },
      success: {
        bg: "bg.success.light",
      },
      warning: {
        bg: "bg.warning.light",
      },
    },
  },
});

export const icon = recipe({
  base: [
    {
      mt: "4",
    },
  ],
  variants: {
    intent: {
      danger: {
        color: "fg.error.strong",
      },
      information: {
        color: "fg.information.strong",
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

export type BannerVariants = NonNullable<RecipeVariants<typeof banner>>;
