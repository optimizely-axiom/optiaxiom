import { recipe, type RecipeVariants } from "../vanilla-extract";

export const alert = recipe({
  base: [
    {
      alignItems: "start",
      color: "fg.default",
      flexDirection: "row",
      fontSize: "md",
      fontWeight: "500",
      gap: "8",
      justifyContent: "space-between",
      p: "12",
      pr: "16",
      rounded: "md",
    },
  ],
  variants: {
    /**
     * Control the appearance by selecting between the different alert types.
     */
    intent: {
      danger: {
        bg: "bg.error.subtle",
      },
      information: {
        bg: "bg.information.subtle",
      },
      neutral: {
        bg: "bg.secondary",
      },
      success: {
        bg: "bg.success.subtle",
      },
      warning: {
        bg: "bg.warning.subtle",
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

export type AlertVariants = RecipeVariants<typeof alert>;
